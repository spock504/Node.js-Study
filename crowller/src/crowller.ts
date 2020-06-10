// 需要导入superagent, 但是是js格式
// ts导入js文件会有问题，所以要有一个中间翻译文件： ts -> .d.ts (翻译文件) -> js
import superagent from 'superagent'; // node 发送请求
import cheerio from 'cheerio'; // 服务端操作dom
import fs from 'fs';
import path from 'path';

interface Tablist {
  text: string;
  img: string | undefined;
}

interface CourseResult {
  time: number;
  data: Tablist[];
}
interface Content {
  [propName: number]: Tablist[];
}
// 创建爬虫类
class Crowller {
  // 创建私有类
  // private secret = 'key';
  private url = `www.imooc.com`;

  async getJsonInfo(html: string) {
    const $ = cheerio.load(html); // 加载html
    const imglist = $('.index-card-container'); // 获取dom节点
    const tablist: Tablist[] = [];
    imglist.map((index, element) => {
      const title = $(element).find('.course-card-name');
      const text = title.text(); // 获取dom的文本值
      const imgUrl = $(element).find('.course-banner');
      const img = imgUrl.attr('src'); // 获取dom的属性值
      tablist.push({
        text,
        img,
      });
    });
    // console.log('tablist', tablist);
    return {
      time: new Date().getTime(),
      data: tablist,
    };
  }

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  // 将获取到的数据存到文件中
  generateJsonContent(courseInfo: CourseResult) {
    const filePath = path.resolve(__dirname, '../data/course.json');
    let fileContent: Content = {};
    //  判断文件是否存在
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  //  优化结构方法：爬虫初始化
  async initSpiderProcess() {
    const filePath = path.resolve(__dirname, '../data/course.json');
    const html = await this.getRawHtml(); // 获取html
    const result = await this.getJsonInfo(html); // 获取具体数据
    const fileContent = this.generateJsonContent(result); // 读取文件
    fs.writeFileSync(filePath, JSON.stringify(fileContent)); // 存数据
  }

  constructor() {
    console.log('constructor'); // 类创建的时候就调用方法获取数据
    this.initSpiderProcess();
  }
}

const crowller = new Crowller();

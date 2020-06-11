import cheerio from 'cheerio'; // 服务端操作dom
import fs from 'fs';

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
// 分析器
export default class Analyzer {
  private static instance: Analyzer;
  static getInstance() {
    if (!Analyzer.instance) {
      Analyzer.instance = new Analyzer();
    }
    return Analyzer.instance;
  }
  private getJsonInfo(html: string) {
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

  // 将获取到的数据存到文件中
  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {};
    //  判断文件是否存在
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return JSON.stringify(fileContent);
  }

  public analyze(html: string, filePath: string) {
    const result = this.getJsonInfo(html); // 获取具体数据
    const fileContent = this.generateJsonContent(result, filePath); // 读取文件
    return fileContent;
  }
  private constructor() {}
}

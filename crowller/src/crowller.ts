// 需要导入superagent, 但是是js格式
// ts导入js文件会有问题，所以要有一个中间翻译文件： ts -> .d.ts (翻译文件) -> js
import superagent from 'superagent'; // node 发送请求
import fs from 'fs';
import path from 'path';
import Analyzer from './analyzer';

interface Analyze {
  analyze: (html: string, filePath: string) => string;
}

// 创建爬虫类
class Crowller {
  // 创建私有类
  private filePath = path.resolve(__dirname, '../data/course.json');

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content); // 存数据
  }

  //  优化结构方法：爬虫初始化
  async initSpiderProcess() {
    const html = await this.getRawHtml(); // 获取html
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  constructor(private url: string, private analyzer: Analyze) {
    console.log('constructor'); // 类创建的时候就调用方法获取数据
    this.initSpiderProcess(); // 初始化
  }
}

// 采用组合设计模式 优化爬虫代码
const url = `www.imooc.com`;
const analyzer = new Analyzer(); // 分析器
new Crowller(url, analyzer); // 爬虫工具

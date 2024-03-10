export interface IfakeCardData {
  id?: string;
  title?: string;
  description?: string;
}

const fakeCardDatalist: IfakeCardData[] = [];
for (let i = 1; i < 10; i += 1) {
  fakeCardDatalist.push({
    id: i.toString(),
    title: "卡片列表",
    description:
      "Umi@4 实战教程，专门针对中后台项目零基础的朋友，不管你是前端还是后端，看完这个系列你也有能力合理“抗雷”，“顶坑”",
  });
}

export default fakeCardDatalist;

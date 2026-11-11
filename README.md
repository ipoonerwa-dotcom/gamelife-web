# 游戏人生

CZ 回忆录 *Freedom of Money* 改编的互动影游的官网，游戏可以直接在页面里玩。

2025 年冬天，二十二岁的林一写来一封手写信："你是怎么开始的？第一步是什么？"他决定认真回答，一章一封手写回信。你回到 1989 年的温哥华、2017 年的上海、2019 年被盗的那一夜，替他做当年的每一个选择。全书八章，35 张卡。序章到第二章免费，不需要钱包。

*An interactive story based on CZ's memoir* Freedom of Money*. A young builder writes to ask "How did you start?" CZ answers him one chapter at a time, and you make his choices. Eight chapters and 35 cards, in Chinese and English; the first three chapters are free and need no wallet.*

## 这个仓库

网站支持中英文：右上角可以切换，选择会记在这台设备上；也可以在网址后加 `?lang=en` 或 `?lang=zh` 直接指定。没选过的访客，浏览器是中文就显示中文，否则显示英文。游戏也跟着网站一起切换，故事正文同样有完整的英文版。

这里只放打包好的静态网站（`index.html` 和 `assets/`、`frames/`、`audio/`、`chapters-cz/`、`site/`），由私有工程构建。所有路径都是相对路径，可以直接放到任何静态托管上：

- **GitHub Pages**：Settings → Pages → Deploy from a branch → `main` / `(root)`。
- **其他托管**：Vercel、Cloudflare Pages、Netlify 都可以，把仓库根目录当作输出目录，不需要构建命令。

第三章到终章的正文不在这里。它们用 drand 时间锁加密，在代币毕业后以 `chapters-cz/C3.enc` … `C7.enc` 的形式加进来。毕业后第 3、6、9、12、15 天，任何人都能解开对应的一章；网站解开前，会先核对金库合约里记录的密文哈希。

## 链上（BNB Chain）

| | 地址 |
|---|---|
| 金库合约 FirstPageVault | [`0x78D14DE2b8C13f85AcDFb15f2561378dD785Fbe3`](https://bscscan.com/address/0x78d14de2b8c13f85acdfb15f2561378dd785fbe3#code)，源码已在 BscScan 和 [Sourcify](https://repo.sourcify.dev/56/0x78D14DE2b8C13f85AcDFb15f2561378dD785Fbe3) 验证 |
| 代币 游戏人生（Freedom of Money） | 即将在 [Gang](https://gang.fun) 发行 |

- **税收去向**：交易税全部进金库，没有营销钱包。一半在每章启封时到 GANG/WBNB 池子买入 GANG，打进黑洞地址销毁；另一半进奖池。
- **合约权限**：金库没有管理员，不能升级。
- **收卡**：在链上收下一张卡，会从你的钱包销毁 20,000 枚「游戏人生」。
- **领奖**：集齐 35 张卡的地址，从毕业后第 15 天起可以领一次奖池的 2%。

## 原著

*Freedom of Money: A Memoir of Protecting Users, Resilience, and the Founding of Binance*，Changpeng Zhao 著，2026 年 4 月出版。

- [Amazon · 英文版](https://www.amazon.com/dp/B0GHL761FP)
- [Amazon · 繁体中文版](https://www.amazon.com/dp/B0GDG6D3WP)
- [Audible · 有声书](https://www.audible.com/search?keywords=Freedom+of+Money+Changpeng+Zhao)

本作是独立的改编作品，与出版方没有合作关系，也不从书籍购买中获得任何收益。

## 署名与声明

- **改编来源**：改编自 *Freedom of Money*（中文版《币安人生》）。
- **人物与画面**：林一是虚构人物；画面是为游戏生成的改编画面，不是真实照片。照片参考：Web Summit / Sportsfile，CC BY 2.0。
- **笔顺数据**：Make Me a Hanzi，Arphic Public License。
- **代币声明**：代币「游戏人生」是游戏的一部分，不是投资产品；本仓库和网站不构成投资建议。*The token is part of the game, not an investment product. Not financial advice.*

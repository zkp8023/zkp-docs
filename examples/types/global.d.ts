/** webNav展示卡片 */
interface ICard {
  name: string
  src: string
  desc?: string
}
interface ICard2 {
  style?: StyleValue // 卡片类名 直接写原子化css
  // style?: HTMLAttributes.style // 卡片类名 直接写原子化css
  name: string // 卡片名称
  img?: string // 展示的图片
  imgStyle?: HTMLAttributes.style // 直接写原子化css
  src?: string // 点击卡片链接
  enSrc?: string // 点击英文地址链接
  zhSrc?: string // 点击中文链接
  otherStr?: string // 其他自定义地址
  otherStrDesc?: string // 其他自定义地址描述
  desc?: string // 卡片描述
  tooltip?: string // 卡片提示
}
interface ICardList {
  cardList: ICard[]
}

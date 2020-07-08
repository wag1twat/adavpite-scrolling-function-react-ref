import { isNotNaNs } from '../store/helpers'
export function toggleScrollSide<T extends React.RefObject<HTMLDivElement>>(
  side: 'next' | 'before',
  parentRef: T,
  childrenRef: T,
  spacing: number
) {
  const { current: parentCurrent } = parentRef
  const { current: childrenCurrent } = childrenRef
  let parentWidth = 0,
    childrenWidth = 0,
    childrensLength = 0,
    parentScrollState = 0,
    slideWidth = 0
  if (parentCurrent && childrenCurrent) {
    //ширина блока-родителя
    parentWidth = parentCurrent.offsetWidth
    //ширина элемента внутри блока-родителя
    childrenWidth = childrenCurrent.offsetWidth + spacing
    //кол-во элементов внутри блока-родителя
    childrensLength = Math.floor(parentWidth / childrenWidth)
    //текущее значение скролла блока-родителя
    parentScrollState = parentCurrent.scrollLeft
    //ширина видимого блока (слайда)
    slideWidth = childrensLength * childrenWidth
    //togglers скролла блока-родителя
    return (parentCurrent.scrollLeft = scroll(
      side,
      parentScrollState,
      parentWidth,
      slideWidth
    ))
  } else return null
}
const scroll = (
  side: 'next' | 'before',
  parentScrollState: number,
  parentWidth: number,
  slideWidth: number
) => {
  if (isNotNaNs(parentScrollState, parentWidth, slideWidth)) {
    if (side === 'next') return parentScrollState + slideWidth
    if (side === 'before') return parentScrollState - slideWidth
  }
  return parentScrollState
}
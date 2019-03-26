import { css } from 'vue-styled-components'
import { Itheme } from '..'

const getColumnSize = (theme: Itheme, gap: string, columnNum: number) => {
  const column = `${(columnNum / theme.columns) * 100}`
  const gapSize = `((${theme.columns - columnNum} * ${gap}) / ${theme.columns})`

  return `calc((${column}% - ${gapSize}))`
}

export const createColumn = (size: number, gap: any) => css`
  flex: 0 0 ${(props: any) => getColumnSize(props.theme, gap, size)};
  max-width: ${(props: any) => getColumnSize(props.theme, gap, size)};
`

export default createColumn

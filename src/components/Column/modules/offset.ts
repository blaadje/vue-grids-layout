import { css } from 'vue-styled-components'
import { Iprops } from '..'

const getOffsetSize = ({ theme }: Iprops, gap: string, columnOffsetNummber: number) => {
  if (columnOffsetNummber === 0) {
    return 0
  }

  const column = `${(columnOffsetNummber / theme.columns) * 100}`
  const gapSize = `((${theme.columns - columnOffsetNummber} * ${gap}) / ${theme.columns})`

  return `calc((${column}% - ${gapSize}) + ${gap})`
}

const createOffset = (columnOffsetNummber: number, gap: string) => css`
  margin-left: ${(props: Iprops) => getOffsetSize(props, gap, columnOffsetNummber)};
`

export default createOffset

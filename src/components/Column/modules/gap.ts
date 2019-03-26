import { css } from 'vue-styled-components'
import { Iprops } from '..'

export const createGaps = (gap: string, num: number) => {
  const isfullSize = ({ theme }: Iprops) => theme.columns === num

  return css`
    &:not(:last-child) {
      margin-right: ${(props: any) => (isfullSize(props) ? '0' : `calc(${gap} / 2)`)};
    }
    &:not(:first-child) {
      margin-left: ${(props: any) => (isfullSize(props) ? '0' : `calc(${gap} / 2)`)};
    }
  `
}

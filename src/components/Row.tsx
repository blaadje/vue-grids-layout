import { Component, Vue } from 'vue-property-decorator'
import styled, { css } from 'vue-styled-components'
import { forEachBreakpoint, Ioption } from './Column'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 100%;
  ${(props: any) =>
    forEachBreakpoint(
      props.theme.config,
      ({ gutters, maxWidth }: Ioption) => css`
        padding: 0 ${gutters};
        width: 100%;
        max-width: ${maxWidth};
      `
    )};
`

@Component
class Row extends Vue {
  public render() {
    return <Wrapper>{this.$slots.default}</Wrapper>
  }
}

export default Row as any

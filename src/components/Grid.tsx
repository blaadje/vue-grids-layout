import { Component, Prop, Vue } from 'vue-property-decorator'
import styled, { ThemeProvider } from 'vue-styled-components'

const Wrapper = styled(ThemeProvider)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`

@Component
class Grid extends Vue {
  @Prop(Number) public readonly columns!: number
  @Prop(Array) public readonly config!: object[]

  public render() {
    return (
      <Wrapper
        theme={{
          columns: this.columns,
          config: this.config,
        }}
      >
        {this.$slots.default}
      </Wrapper>
    )
  }
}

export default Grid as any

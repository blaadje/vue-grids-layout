import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import styled, { css } from 'vue-styled-components'
import createColumn from './modules/column'
import { createGaps } from './modules/gap'
import createOffset from './modules/offset'

export interface Ioption {
  gap: string
  gutters: string
  maxWidth: string
  name: string
  size: string
}

export interface Itheme {
  columns: number
  config: Ioption[]
}

export interface Iprops {
  theme: Itheme
  xs: string | number
  sm: string | number
  md: string | number
  lg: string | number
  xsOffset: string | number
  smOffset: string | number
  mdOffset: string | number
  lgOffset: string | number
}

@Component
class Column extends Vue {
  @Prop([Number, String]) public xs!: number | string

  @Prop({
    default() {
      // @ts-ignore
      return this.xs
    },
  })
  public sm!: number | string

  @Prop({
    default() {
      // @ts-ignore
      return this.sm
    },
  })
  public md!: number | string

  @Prop({
    default() {
      // @ts-ignore
      return this.md
    },
  })
  public lg!: number | string

  @Prop([Number, String]) public xsOffset!: number | string

  @Prop({
    default() {
      // @ts-ignore
      return this.xsOffset
    },
  })
  public smOffset!: number | string

  @Prop({
    default() {
      // @ts-ignore
      return this.smOffset
    },
  })
  public mdOffset!: number | string

  @Prop({
    default() {
      // @ts-ignore
      return this.mdOffset
    },
  })
  public lgOffset!: number | string

  public render() {
    return <div>{this.$slots.default}</div>
  }
}

export const forEachBreakpoint = (config: any, callback: any) => {
  const mobileConfig = config[0]
  const breakpointsConfig = config.slice(1)

  return css`
    ${callback({
      gap: mobileConfig.gap,
      gutters: mobileConfig.gutters,
      maxWidth: mobileConfig.maxWidth,
      name: mobileConfig.name,
    })}
    ${breakpointsConfig.map((item: any) => {
      return css`
        @media (${item.size}) {
          ${callback({
            gap: item.gap,
            gutters: item.gutters,
            maxWidth: item.maxWidth,
            name: item.name,
          })}
        }
      `
    })}
  `
}

const columnManager = (props: Iprops): any => {
  const {
    theme: { columns, config },
  } = props

  const sizes: any = {
    lg: Number(props.lg),
    md: Number(props.md),
    sm: Number(props.sm),
    xs: Number(props.xs),
  }

  const offsets: any = {
    lgOffset: Number(props.lgOffset),
    mdOffset: Number(props.mdOffset),
    smOffset: Number(props.smOffset),
    xsOffset: Number(props.xsOffset),
  }

  const exceedColumnAmount = Object.values(sizes).some(columnNumber => columnNumber > columns)

  if (exceedColumnAmount) {
    throw new Error(`Column amount can't be higher than ${columns}`)
  }

  const offsetName: any = Object.keys(offsets).find(item => item.includes(name))

  const offset = offsets[offsetName] ? offsets[offsetName] : 0

  return forEachBreakpoint(config, ({ gap, name }: Ioption) => [
    createColumn(sizes[name], gap),
    createOffset(offset, gap),
    createGaps(gap, sizes[name]),
  ])
}

export default styled(Column)`
  position: relative;
  width: 100%;
  min-height: 1px;
  ${(props: any): void => columnManager(props)}
`

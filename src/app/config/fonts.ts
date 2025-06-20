import classNames from 'classnames'
import { Inter, JetBrains_Mono, Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin']
})
const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin']
})
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

export const classname = classNames(
  montserrat.variable,
  jetbrains.variable,
  inter.variable
)

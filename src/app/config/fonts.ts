import classNames from 'classnames'
import { Inter, JetBrains_Mono, Montserrat, Poppins } from 'next/font/google'

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
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600']
})

export const classname = classNames(
  montserrat.variable,
  jetbrains.variable,
  inter.variable,
  poppins.variable
)

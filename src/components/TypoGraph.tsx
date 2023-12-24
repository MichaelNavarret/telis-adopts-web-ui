import Typography from '@mui/material/Typography'
import styles from './TypoGraph.module.scss'

type TypoGraphProps = {
  /** The children is used to pass child elements to the component. It is of type React.ReactNode.*/
  children?: React.ReactNode
  /** The content is used to pass a string of text to the component. It is of type string.*/
  content?: string
  /** The variant is used to specify the typography variant to use. It is of type string and can be one of the values defined in the variable type.*/
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'button'
    | 'caption'
    | 'overline'
  /** The   align is used to specify the text alignment. It is of type string and can be one of the following values defined in the variable type.*/
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right'
  /** The classes is used to pass custom CSS classes to the component. It is of type object.*/
  classes?: object
  /** The gutterBottom is used to add bottom margin to the component. It is of type boolean and the default value is true.*/
  gutterBottom?: boolean
  /** The paragraph is used to add bottom margin to the component. It is of type boolean and the default value is true.*/
  paragraph?: boolean
  /** The component is used to specify the HTML element or React component to use as the root element of the component. It is of type React.ElementType and the default value is 'div'.*/
  component?: React.ElementType
  /** The onClick is used to specify a function to be called when the component is clicked. It is of type React.FormEventHandler.*/
  onClick?: React.FormEventHandler
  /** The mb is used to specify the bottom margin of the component. It is of type number and the default value is 0.*/
  mb?: number
  /** The mt is used to specify the top margin of the component. It is of type number and the default value is 0.*/
  mt?: number
  /** The color is used to specify the color of the text. It is of type string.*/
  color?: string
  /** The sx is used to pass custom styles to the component. It is of type object.*/
  sx?: object
  /** The link is used to specify whether the component should behave like a link. It is of type boolean and the default value is false.*/
  link?: boolean
  /** The className is used to specify a CSS class name for the component. It is of type string.*/
  className?: string

  href?: string

  bold?: boolean

  isDownload?: boolean

  id?: string
}

const TypoGraph = (props: TypoGraphProps) => {
  const {
    children,
    variant = 'body1',
    sx,
    align = 'left',
    gutterBottom = true,
    paragraph = true,
    classes,
    mb = 0,
    mt = 0,
    color,
    href,
    isDownload,
    link = false,
    content,
    className,
    bold = false,
    component = 'div',
    onClick = () => {},
    id,
  } = props
  let typoSx = { ...sx }

  if (link) {
    typoSx = { ...typoSx, cursor: 'pointer' }
  }

  if (color) {
    typoSx = { ...typoSx, color: color }
  }

  if (bold) {
    typoSx = { ...typoSx, fontWeight: 'bold' }
  }

  return (
    <Typography
      sx={typoSx}
      className={className}
      variant={variant}
      classes={classes}
      align={align}
      gutterBottom={gutterBottom}
      paragraph={paragraph}
      component={component}
      onClick={onClick}
      mb={mb}
      mt={mt}
      id={id}
    >
      {link && href && isDownload ? (
        <a
          href={href}
          onClick={(e) => {
            e.preventDefault()
          }}
          className={styles.openInTab}
        >
          {children || content}
        </a>
      ) : (
        children || content
      )}
    </Typography>
  )
}

export default TypoGraph

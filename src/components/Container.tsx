import MuiContainer from '@mui/material/Container'

type ContainerProps = {
  /** The className represents the name(s) of the CSS class(es) to be applied to the component.*/
  className?: string
  /** The disableGutters indicates whether the left and right padding of the container is removed.*/
  disableGutters?: boolean
  /** The children is a special prop in React that allows a component to render any content that is passed between its opening and closing tags.*/
  children?: React.ReactNode
  /** The maxWidth indicates the maximum width of the container.*/
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  /** The sx is a shorthand for defining custom styles for the component using the Material-UI styling solution. It allows you to apply custom CSS styles to the component without having to write CSS classes or use inline styles.*/
  sx?: object
  /** The innerHtml is an object containing a string of HTML content to render inside the container using the dangerouslySetInnerHTML prop.*/
  innerHtml?: {
    __html: string
  }
  id?: string
}

const Container = (props: ContainerProps) => {
  const { className, disableGutters = true, maxWidth = false, children, sx = {}, innerHtml, id } = props
  return (
    <MuiContainer
      id={id}
      className={`${className}`}
      sx={{ display: 'grid', ...sx }}
      disableGutters={disableGutters}
      maxWidth={maxWidth}
      dangerouslySetInnerHTML={innerHtml}
    >
      {children}
    </MuiContainer>
  )
}

export default Container

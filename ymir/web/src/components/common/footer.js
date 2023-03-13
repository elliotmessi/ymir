import config from '@/../package.json'

const Footer = () => (
  <footer style={{ textAlign: 'center' }}>
    &copy;copyright VesionBook@Team 2022 version: {config.version}
  </footer>
)

export default Footer

import config from '@/../package.json'

const Footer = () => (
  <footer style={{ textAlign: 'center' }}>
    &copy;copyright @Team 2023 version: {config.version}
  </footer>
)

export default Footer

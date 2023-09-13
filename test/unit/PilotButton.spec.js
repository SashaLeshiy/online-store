import { render } from '@testing-library/vue'
import { screen } from '@testing-library/dom'
import PilotButton from '../../src/shared/ui/PilotButton.vue'

test('renders button', () => {
  const options = {
    slots: {
      default: 'test button'
    }
  }

    render(PilotButton, options)
  
    screen.getByText('test button')
  })
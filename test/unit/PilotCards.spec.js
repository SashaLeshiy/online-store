import { render } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import PilotCards from '../../src/widgets/PilotCards.vue'

test('renders a pilotcards', () => {
  const {debug} = render(PilotCards, {
    global: {
      plugins: [createTestingPinia()],
    }
  })

  debug()
})
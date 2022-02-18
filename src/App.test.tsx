import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  it('should render critical components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('PromptModal')).toHaveLength(1);
    expect(wrapper.find('CommandButtons')).toHaveLength(1);
    expect(wrapper.find('OptionButtonGroup')).toHaveLength(1);
    expect(wrapper.find('Summary')).toHaveLength(0);
  });
});

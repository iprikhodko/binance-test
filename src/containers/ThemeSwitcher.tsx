import { connect } from 'react-redux';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { IState } from '../redux/reducers';
import { changeTheme } from '../redux/reducers/ui/actions';

const mapStateToProps = (state: IState) => ({
  theme: state.ui.theme,
});

const mapDispatchToProps = {
  onThemeChange: changeTheme,
};

const ThemeSwitcherContainer = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitcher);

export default ThemeSwitcherContainer;

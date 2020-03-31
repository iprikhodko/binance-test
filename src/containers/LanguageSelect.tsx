import { connect } from 'react-redux';
import Select from '../components/Select';
import APP from '../constants/app';
import { IState } from '../redux/reducers';
import { changeLanguage } from '../redux/reducers/ui/actions';

const OPTIONS = Object.values(APP.LANGUAGES).map(lang => ({
  id: lang,
  name: lang,
}));

const mapStateToProps = (state: IState) => ({
  value: state.ui.language,
  options: OPTIONS,
});

const mapDispatchToProps = {
  onChange: ({ id }: typeof OPTIONS[number]) => changeLanguage(id),
};

// @ts-ignore
const LanguageSelectContainer = connect(mapStateToProps, mapDispatchToProps)(Select);

export default LanguageSelectContainer;

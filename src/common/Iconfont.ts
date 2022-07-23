import iconfontJson from '../assets/iconfont.json';
import {createIconSet} from 'react-native-vector-icons';

const glyphMap: Record<string, number> = {};
iconfontJson.glyphs.forEach((item: {name: string; unicode_decimal: number}) => {
  glyphMap[item.name] = item.unicode_decimal;
});

const Icon = createIconSet(glyphMap, 'iconfont', require('../assets/fonts/iconfont.ttf'));
export default Icon;

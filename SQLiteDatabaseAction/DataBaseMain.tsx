import { openDatabase } from 'react-native-sqlite-storage';
import { tableData } from './TableData';

export default class DB {
  static DATABASE = openDatabase({ name: 'cmc.db' ,location: 'default', });
}
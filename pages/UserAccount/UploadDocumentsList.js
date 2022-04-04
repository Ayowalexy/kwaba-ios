import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import fileUploadReducer from '../../redux/reducers/documentUploadReducers';
import {
  deleteUploadedFile,
  showUploadedFiles,
  uploadFile,
} from '../../redux/actions/documentUploadActions';
import RNFS from 'react-native-fs';
import axios from 'axios';
import AllDocuments from '../AllDocuments/AllDocuments';

export default function UploadDocumentsList({navigation}) {
  const [documents, setDocuments] = useState([]);
  const [name, setName] = useState('');

  return <AllDocuments />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
});

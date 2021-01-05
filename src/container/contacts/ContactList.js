import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {images, colors} from '../../themes';
import strings from '../../themes/strings';
import {moderateScale} from '../../utils/ResponsiveUi';
import {PreferenceKey, PreferenceManager} from '../../utils';
import TextField from '../../components/TextField.js';
import Button from '../../components/Button.js';
import {Actions} from 'react-native-router-flux';
import {debounce} from 'lodash';
import Contacts from 'react-native-contacts';
import ContactListCell from '../contacts/ContactListCell.js';

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayContacts: [],
      searchText: '',
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        this.loadContacts();
      });
    } else {
      this.loadContacts();
    }
    this.onBackpress = debounce(this.onBackpress.bind(this), 1000, {
      leading: true,
      trailing: false,
    });
  }

  // Back event of Contact list screen
  async onBackpress() {
    var index = this.state.arrayContacts.findIndex(
      (item) => item.isSelect === true,
    );
    await PreferenceManager.setPreferenceValue(
      PreferenceKey.CONTACT_DATA,
      JSON.stringify(this.state.arrayContacts[index]),
    );
    this.props.updateData(this.state.arrayContacts[index]);
    Actions.pop();
  }

  // Get All Contact from the device
  loadContacts() {
    Contacts.getAll().then((contacts) => {
      if (contacts.length > 0) {

        // Filter Contact by Phonenuber found
        let tempContacts = contacts.filter(
          (item) => item.phoneNumbers.length > 0,
        );
        let sortedContact = tempContacts.sort(function (a, b) {
          var nameA = a.givenName.toUpperCase(); // ignore upper and lowercase
          var nameB = b.givenName.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        sortedContact[0].isSelect = true;
        sortedContact[0].phoneNumbers[0].isSelect = true;
        this.setState({arrayContacts: sortedContact});
      }
    });
  }
 
  //Search Contacts
  onSearch(text) {
    const {arrayContacts} = this.state;
    if (text.length === 0) {
      this.loadContacts();
      this.setState({searchText: ''});
    } else {
      const filterResult = arrayContacts.filter(
        (item) =>
          item.givenName.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
          item.familyName.toLowerCase().indexOf(text.toLowerCase()) > -1,
      );
      this.setState({searchText: text, arrayContacts: filterResult});
    }
  }

  //Footer For last record after space
  renderFooter() {
    return <View style={styles.footerView} />;
  }

  //Contact select
  onContactSelect = (index) => {
    let {arrayContacts} = this.state;
    const updatedData = arrayContacts.map((currItem, i) => {
      if (index === i) {
        let targetPost = arrayContacts[index];
        targetPost.isSelect = true;
        for (let i = 0; i < targetPost.phoneNumbers.length; i++) {
          if (i === 0) {
            targetPost.phoneNumbers[i].isSelect = true;
          } else {
            targetPost.phoneNumbers[i].isSelect = false;
          }
        }
        return targetPost;
      } else {
        let targetPost = arrayContacts[i];
        targetPost.isSelect = false;
        return targetPost;
      }
    });
    this.setState({arrayContacts: updatedData});
  };

  //Contact Mobile number selection
  onMobileNumberSelect = (index, selectedNumberIndex) => {
    let {arrayContacts} = this.state;
    const updatedData = arrayContacts.map((currItem, i) => {
      if (arrayContacts[index].recordID === currItem.recordID) {
        let targetPost = arrayContacts[index];
        targetPost.isMobileSelect = true;
        arrayContacts[index].isSelect = true;
        targetPost.phoneNumbers[selectedNumberIndex].isSelect = targetPost
          .phoneNumbers[selectedNumberIndex].isSelect
          ? false
          : true;
        for (let j = 0; j < targetPost.phoneNumbers.length; j++) {
          if (j !== selectedNumberIndex) {
            targetPost.phoneNumbers[j].isSelect = false;
          }
        }
        return targetPost;
      } else {
        let targetPost = arrayContacts[i];
        targetPost.isSelect = false;
        return targetPost;
      }
    });
    this.setState({arrayContacts: updatedData});
  };

  //Contact list render
  renderContactList = ({item, index}) => {
    return (
      <ContactListCell
        item={item}
        index={index}
        arrayContacts={this.state.arrayContacts}
        onMobileNumberSelect={this.onMobileNumberSelect}
        onContactSelect={this.onContactSelect}
      />
    );
  };

  render() {
    const {searchText, arrayContacts} = this.state;
    return (
      <View style={styles.mainView}>
        <SafeAreaView>
          <View style={styles.backButtonView}>
            <Button
              buttonImage={images.back}
              height={moderateScale(20)}
              width={moderateScale(20)}
              onButtonPress={() => this.onBackpress()}
            />
          </View>
          <View style={styles.searchView}>
            <TextField
              onChangeText={(text) => this.onSearch(text)}
              icon={images.contact_list_search}
              placeHolder={strings.searchContact}
              height={moderateScale(40)}
              width={'95%'}
              value={searchText}
              isEditable={true}
              marginBottom={0}
            />
          </View>
          <View style={styles.listView}>
            <FlatList
              data={arrayContacts}
              renderItem={this.renderContactList}
              keyExtractor={(item) => item.recordID}
              ListFooterComponent={this.renderFooter}
              extraData={this.state}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default ContactList;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backButtonView: {
    width: '97%',
    height: '5%',
    margin: moderateScale(5),
    justifyContent: 'center',
  },
  searchView: {
    width: '97%',
    height: '11%',
    margin: moderateScale(5),
  },
  listView: {width: '100%', height: '83%'},
  footerView: {height: moderateScale(70), width: '100%'},
});

import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {images} from '../../themes';
import strings from '../../themes/strings';
import {moderateScale} from '../../utils/ResponsiveUi';
import TextField from '../../components/TextField.js';
import Button from '../../components/Button.js';
import {Actions} from 'react-native-router-flux';
import {debounce} from 'lodash';
import {PreferenceKey, PreferenceManager} from '../../utils';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      name: '',
      type: '',
    };
  }

  componentDidMount() {
    //Apply debounce to avoid multiclick of button
    this.openContactList = debounce(this.openContactList.bind(this), 1000, {
      leading: true,
      trailing: false,
    });
    this.getLastSelectedContact();
  }

  // Get Last Selected Contact
  async getLastSelectedContact() {
    let contactData = await PreferenceManager.getPreferenceValue(
      PreferenceKey.CONTACT_DATA,
    );
    if (contactData !== null) {
      this.getSelectedData(JSON.parse(contactData));
    }
  }

  // Open Contact List screem
  openContactList() {
    Actions.push('ContactList', {updateData: this.getSelectedData});
  }

  // Open Contact List screem
  getSelectedData = (data) => {
    var index = data.phoneNumbers.findIndex((item) => item.isSelect === true);
    if (index !== -1) {
      let phoneDetail = data.phoneNumbers[index];
      this.setState({
        mobileNumber: phoneDetail.number,
        type: phoneDetail.type,
        name: data.givenName + ' ' + data.familyName,
      });
    }
  };

  render() {
    const {mobileNumber, type, name} = this.state;
    return (
      <View style={styles.mainView}>
        <SafeAreaView style={styles.mainView}>
          <View style={styles.contactView}>
            <Button
              buttonImage={images.contact_logo}
              buttonTitle={'Contacts'}
              height={moderateScale(40)}
              width={moderateScale(40)}
              onButtonPress={() => this.openContactList()}
            />
            <View style={styles.textView}>
              <Text style={{fontSize: moderateScale(16)}}>
                {strings.selectContact}
              </Text>
            </View>
          </View>
          {mobileNumber.length !== 0 && (
            <View style={{alignSelf: 'center'}}>
              <TextField
                onChangeText={(text) => this.setState({mobileNumber: text})}
                icon={images.contact_logo}
                height={moderateScale(40)}
                width={'95%'}
                value={name}
                isEditable={false}
                marginBottom={10}
              />
              <TextField
                onChangeText={(text) => this.setState({mobileNumber: text})}
                icon={images.callIcon}
                height={moderateScale(40)}
                width={'95%'}
                value={mobileNumber}
                isEditable={false}
                marginBottom={0}
              />
            </View>
          )}
        </SafeAreaView>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  contactView: {
    height: '10%',
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  textView: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

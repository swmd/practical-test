import React, {Fragment} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {moderateScale} from '../../utils/ResponsiveUi';
import {images, colors} from '../../themes';
import Button from '../../components/Button.js';
class ContactListCell extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  // Get thumbinal name when contact photo not found
  getThumbName(item) {
    return item.givenName.charAt(0) + ' ' + item.familyName.charAt(0);
  }

  // Contact Selection
  selectContactButton(data, index, selectedNumberIndex) {
    const {onMobileNumberSelect} = this.props;
    onMobileNumberSelect(index, selectedNumberIndex);
  }

  // Multiple PhoneNumbers renders
  renderItem(item, index) {
    return item.phoneNumbers.map((data, i) => {
      return (
        <TouchableOpacity key={data.number + i}>
          <View style={styles.phoneNumberView}>
            <View style={styles.phoneNumberSubView}>
              <Text style={styles.phoneNumberType}>
                {data.label + ': '}
                <Text style={styles.phoneNumberType}>{data.number}</Text>
              </Text>
            </View>
            <View style={styles.radioButtonParentView}>
              <Button
                buttonImage={data.isSelect ? images.radioOn : images.radioOff}
                buttonTitle={''}
                key={data.number + i}
                height={moderateScale(20)}
                width={moderateScale(20)}
                onButtonPress={() => this.selectContactButton(item, index, i)}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    const {item, index, onContactSelect} = this.props;
    return (
      <TouchableOpacity
        key={item.recordID}
        style={{
          backgroundColor: item.isSelect ? colors.lightGray : colors.white,
        }}
        onPress={() => onContactSelect(index)}>
        <View style={styles.cellMainView}>
          <View
            style={[
              styles.cellMainSubView,
              {
                backgroundColor:
                  item.thumbnailPath.length !== 0
                    ? colors.transparent
                    : colors.lightGray,
              },
            ]}>
            {item.thumbnailPath.length !== 0 ? (
              <Image
                style={styles.imageContact}
                source={{uri: item.thumbnailPath}}
              />
            ) : (
              <Text style={styles.thumbtext}>{this.getThumbName(item)}</Text>
            )}
          </View>
          <View style={styles.contactView}>
            <View style={styles.contactNameSubView}>
              <Text>{item.givenName + ' ' + item.familyName}</Text>
            </View>
            <View style={styles.phonenumbersView}>
              <ScrollView>{this.renderItem(item, index)}</ScrollView>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  phoneNumberView: {
    width: '100%',
    height: moderateScale(30),
    marginBottom: moderateScale(3),
    flexDirection: 'row',
  },
  phoneNumberSubView: {
    width: '80%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  phoneNumberType: {
    fontSize: moderateScale(10),
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  radioButtonParentView: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cellMainView: {
    width: '95%',
    margin: moderateScale(10),
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    borderRadius: 10,
    elevation: 3,
  },
  cellMainSubView: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: moderateScale(8),
  },
  imageContact: {
    height: moderateScale(60),
    width: moderateScale(60),
    resizeMode: 'contain',
    borderRadius: moderateScale(30),
  },
  thumbtext: {fontSize: moderateScale(22), fontWeight: 'bold'},
  contactView: {
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(5),
  },
  contactNameSubView: {
    width: '100%',
    height: moderateScale(25),
    justifyContent: 'center',
  },
  phonenumbersView: {
    width: '100%',
  },
});

export default ContactListCell;

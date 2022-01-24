import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {
  COLORS,
  FONTS,
  images,
  SIZES,
  icons,
  designs,
} from '../../../util/index';

import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';

const General = () => {
  const [activeSections, setActiveSections] = useState([]);
  const SECTIONS = [
    {
      title: 'What is Kwaba?',
      body:
        'Kwaba is a rent saving and financing platform that helps renters meet up with rent payment on their own terms. On Kwaba, renters can save, pay rent monthly and access instant cash loans all in one place.',
    },
    {
      title: 'Why do I have to add my BVN?',
      body:
        'Your BVN is required to authenticate identity and to protect you against fraudulent activities.',
    },
    {
      title: 'Who can use Kwaba?',
      body: 'Anyone renter or aspiring renter can use Kwaba.',
    },
    {
      title: 'How long do I have to pay back my rent?',
      body: 'Your repayment plan can be between 1 to 12 months.',
    },
    {
      title: 'Am I eligible for Kwaba’s monthly rent payment?',
      body:
        'As long as you work, have a clean credit history and above 21 years, you are eligible.',
    },
    {
      title: 'Does Kwaba finance only properties listed on its platform?',
      body:
        'No. We finance all rental properties, both listed and not listed on our platform. We can help renew the rent of your existing accommodation or pay for that new house on your behalf.',
    },
    {
      title: 'What city do I have to reside in to use Kwaba’s rental finance?',
      body: 'Residents of Lagos can use our rental finance feature',
      // 'Residents of Lagos, Abuja and Port-Harcourt can use our rental finance feature',
    },
    {
      title: 'Can I speak to a customer care representative?',
      body:
        'Yes you can. Our customer care lines are open from Monday to Friday, 8am - 5pm. Give us a shout on +234 901 8112914.',
    },
  ];

  const _renderHeader = (section) => {
    return (
      <Animatable.View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Animatable.Text style={styles.accordionTitle}>
          {section.title}
        </Animatable.Text>
        <Icon
          onPress={() => navigation.goBack()}
          name={'chevron-down'}
          size={20}
          style={{
            marginRight: 20,
            fontWeight: 'bold',
            color: COLORS.grey,
          }}
        />
      </Animatable.View>
    );
  };

  const _renderContent = (section, isActive) => {
    return (
      <Animatable.View
        duration={300}
        style={{paddingHorizontal: 20, paddingBottom: 20}}>
        <Animatable.Text
          duration={500}
          easing="ease-in-out-expo"
          // animation={isActive == activeSections ? 'zoomIn' : false}
          style={[styles.accordionBody]}>
          {section.body}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  const _updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Accordion
        underlayColor={'#2A286A20'}
        sections={SECTIONS}
        activeSections={activeSections}
        // renderSectionTitle={_renderSectionTitle}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        sectionContainerStyle={styles.accordionContent}
      />
    </ScrollView>
  );
};
const RentSaving = () => {
  const [activeSections, setActiveSections] = useState([]);
  const SECTIONS = [
    {
      title: 'Is my rent savings safe?',
      body:
        'Yes, your savings are safe as they are insured by NDIC and secured with bank-grade security features. We work with PCIDSS compliant payment processors to ensure your money and data is safe and fraud-proof.',
    },
    {
      title: 'What is the interest rate added to my rent per deposit?',
      body:
        'You get 7% interest per annum if your savings plan is unlocked and 8% interest per annum if your savings plan is locked.',
    },
    {
      title: 'Am I eligible to save on Kwaba?',
      body:
        'As long as you have a rent goal to achieve, you are eligible to save on Kwaba.',
    },
    {
      title: 'Can I withdraw all my money if I don’t want to save anymore?',
      body:
        'Yes you can but only if you select “unlock” savings when beginning your saving plan. If you select to lock your savings, for discipline purposes, you won’t be able to get your money until the set withdrawal date. Not to worry, you can use our instant loan feature if you need emergency cash.',
    },
    {
      title: 'Can I change my savings plan at any time?',
      body:
        'Yes. All you have to do is go into your dashboard to update your change and Kwaba would update accordingly.',
    },
    {
      title: 'Do I need to connect my bank account to Kwaba?',
      body:
        'If you opt for the option of automatic withdrawal from your bank, then yes, you would have to sync your bank account to your Kwaba app. However if you prefer the option of manual transfers to your Kwaba app, no synchronization would be necessary.',
    },
    {
      title: 'Why should I save on Kwaba?',
      body: `Saving with Kwaba opens a world of financial possibilities for you like:
        \n# Getting access to instant  loans when you have emergencies
        \n# Getting rental loans when you can’t meet up with your rent payment.
        \n# Earn high interest on your savings
        \n# Build the discipline needed to be financially successful`,
    },
    {
      title: 'What kind of debit cards do you use on Kwaba?',
      body: 'Kwaba accepts all debit cards',
    },
    {
      title: 'How much can I save on Kwaba?',
      body:
        'You can begin saving with a minimum of one hundred naira (N100). We have no upper limit.',
    },
    {
      title: 'How soon does my savings start to earn returns?',
      body:
        'Your savings start to earn returns or interest the day after you start saving on Kwaba.',
    },
  ];

  const _renderHeader = (section) => {
    return (
      <Animatable.View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Animatable.Text style={styles.accordionTitle}>
          {section.title}
        </Animatable.Text>
        <Icon
          onPress={() => navigation.goBack()}
          name={'chevron-down'}
          size={20}
          style={{
            marginRight: 20,
            fontWeight: 'bold',
            color: COLORS.grey,
          }}
        />
      </Animatable.View>
    );
  };

  const _renderContent = (section, isActive) => {
    return (
      <Animatable.View
        duration={300}
        style={{paddingHorizontal: 20, paddingBottom: 20}}>
        <Animatable.Text
          duration={500}
          easing="ease-in-out-expo"
          // animation={isActive == activeSections ? 'zoomIn' : false}
          style={[styles.accordionBody]}>
          {section.body}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  const _updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Accordion
        underlayColor={'#2A286A20'}
        sections={SECTIONS}
        activeSections={activeSections}
        // renderSectionTitle={_renderSectionTitle}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        sectionContainerStyle={styles.accordionContent}
      />
    </ScrollView>
  );
};
const EmergencyFund = () => {
  const [activeSections, setActiveSections] = useState([]);
  const SECTIONS = [
    {
      title: 'What is Kwaba Emergency Fund?',
      body:
        'Kwaba emergency fund helps Kwaba rent savers access instant loans without touching their rent.',
    },
    {
      title: 'Am I eligible to access emergency loans?',
      body:
        'Once you are an active saver on Kwaba, you can access emergency funds.',
    },
    {
      title: 'How long do I have to pay back?',
      body: 'You have to pay back in 30 days.',
    },
    {
      title: 'Can I access emergency funds without being a saver on Kwaba',
      body: 'Emergency funds are limited to just Kwaba savers.',
    },
  ];

  const _renderHeader = (section) => {
    return (
      <Animatable.View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Animatable.Text style={styles.accordionTitle}>
          {section.title}
        </Animatable.Text>
        <Icon
          onPress={() => navigation.goBack()}
          name={'chevron-down'}
          size={20}
          style={{
            marginRight: 20,
            fontWeight: 'bold',
            color: COLORS.grey,
          }}
        />
      </Animatable.View>
    );
  };

  const _renderContent = (section, isActive) => {
    return (
      <Animatable.View
        duration={300}
        style={{paddingHorizontal: 20, paddingBottom: 20}}>
        <Animatable.Text
          duration={500}
          easing="ease-in-out-expo"
          // animation={isActive == activeSections ? 'zoomIn' : false}
          style={[styles.accordionBody]}>
          {section.body}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  const _updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Accordion
        underlayColor={'#2A286A20'}
        sections={SECTIONS}
        activeSections={activeSections}
        // renderSectionTitle={_renderSectionTitle}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        sectionContainerStyle={styles.accordionContent}
      />
    </ScrollView>
  );
};
const RentNowPayLater = () => {
  const [activeSections, setActiveSections] = useState([]);
  const SECTIONS = [
    {
      title: 'Why do I have to add my BVN?',
      body:
        'Your BVN is required to authenticate identity and to protect you against fraudulent activities.',
    },
    {
      title: 'How long does it take for my rent to be paid?',
      body:
        'Kwaba ensures that your rent is paid within 48hours of receiving all your supporting documents',
    },
    {
      title: 'How do I add my bank statement?',
      body:
        'You can manually upload your bank statement if you have it handy or securely connect your bank account on our app or website via trusted 3rd party platforms via your mobile/internet banking app.',
    },
    {
      title: 'How long do I have to pay back my rent?',
      body:
        'Your repayment plan can be between 1 to 12 months. We always recommend a 6 months payment duration',
    },
    {
      title: 'Am I eligible for Kwaba’s monthly rent payment?',
      body:
        'As long as you do not have any bad loans and you have a consistent stream of income, you are eligible.',
    },
    {
      title: 'Does Kwaba finance only properties listed on its platform.',
      body:
        'No. We finance all rental properties, both listed and not listed on our platform. We can help renew the rent of your existing accommodation or pay for that new house on your behalf.',
    },
    {
      title:
        'What city do I have to reside in to use Kwaba’s rent now, pay later?',
      body:
        'Residents of Lagos, Abuja and Port-Harcourt can use our rental finance feature. We are fast expanding and will be in more cities soon.',
    },
    {
      title: 'Can I speak to a customer care representative',
      body:
        'Yes you can. Our customer care lines are open from Monday to Friday, 8am - 5pm. Give us a shout on +234 901 8112914.',
    },
    {
      title: 'What are the requirements for getting rental finance?',
      body:
        'Kwaba has just 2 basic requirements: Your bank statement for the last six months and a valid government issued identity card. All these can be conveniently uploaded on our website or app.',
    },
    {
      title: 'How do I get my bank statement?',
      body:
        'Your bank statement can be generated from your online banking app. You can also send an email to your bank to request your bank statement.',
    },
    {
      title: 'Why was I not given the amount I requested?',
      body:
        'Your income amongst other factors determines your pre approved amounts.',
    },
    {
      title: 'Can I pay off all my outstanding rental payment when I have it?',
      body:
        'Yes, you certainly can. Reach out to your correspondent or call our customer service line: +234 901 8112914 to get the process of repayment started.',
    },
  ];

  const _renderHeader = (section) => {
    return (
      <Animatable.View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Animatable.Text style={styles.accordionTitle}>
          {section.title}
        </Animatable.Text>
        <Icon
          onPress={() => navigation.goBack()}
          name={'chevron-down'}
          size={20}
          style={{
            marginRight: 20,
            fontWeight: 'bold',
            color: COLORS.grey,
          }}
        />
      </Animatable.View>
    );
  };

  const _renderContent = (section, isActive) => {
    return (
      <Animatable.View
        duration={300}
        style={{paddingHorizontal: 20, paddingBottom: 20}}>
        <Animatable.Text
          duration={500}
          easing="ease-in-out-expo"
          // animation={isActive == activeSections ? 'zoomIn' : false}
          style={[styles.accordionBody]}>
          {section.body}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  const _updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Accordion
        underlayColor={'#2A286A20'}
        sections={SECTIONS}
        activeSections={activeSections}
        // renderSectionTitle={_renderSectionTitle}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        sectionContainerStyle={styles.accordionContent}
      />
    </ScrollView>
  );
};
// const Withdrawal = () => {
//   return (
//     <ScrollView showsVerticalScrollIndicator={false}>
//       <Text>Withdrawal</Text>
//     </ScrollView>
//   );
// };
const renderTabBar = (props) => (
  <TabBar
    {...props}
    scrollEnabled={true}
    indicatorStyle={{
      backgroundColor: COLORS.primary,
      //   backgroundColor: 'transparent',
      flex: 1,
      height: '100%',
      borderRadius: 5,
      elevation: 2,
      zIndex: 99999,
      //   width: 200,
    }}
    // indicatorContainerStyle={{backgroundColor: 'red'}}
    pressColor={'transparent'}
    style={{
      backgroundColor: '#F7F8FD',
      elevation: 0,
      width: '100%',
      marginVertical: 10,
    }}
    tabStyle={{
      backgroundColor: 'transparent',
      marginHorizontal: 10,
      borderRadius: 5,
      zIndex: 1,
      padding: 0,
    }}
    renderLabel={({route, focused, color}) => (
      <Text
        // numberOfLines={1}
        style={{
          color: focused ? 'white' : '#808285',
          fontSize: 12,
          //   fontWeight: focused ? 'bold' : 'normal',
          fontWeight: 'bold',
        }}>
        {route.title}
      </Text>
    )}
  />
);

const LegalandFaq = ({navigation}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'one', title: 'General'},
    {key: 'two', title: 'Rent Saving'},
    {key: 'three', title: 'Emergency Fund'},
    {key: 'four', title: 'Rent Now, Pay Later'},
    // {key: 'five', title: 'Withdrawal'},
  ]);
  const renderScene = SceneMap({
    one: General,
    two: RentSaving,
    three: EmergencyFund,
    four: RentNowPayLater,
    // five: Withdrawal,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={25}
          style={{
            // marginTop: 28,
            // marginLeft: 16,
            fontWeight: '900',
            paddingVertical: 20,
            color: COLORS.white,
            position: 'absolute',
            top: 0,
            left: 0,
            padding: 20,
            zIndex: 2,
          }}
          color="#2A286A"
        />
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.white,
              textAlign: 'center',
              marginTop: 20,
              lineHeight: 28,
              //   backgroundColor: 'red',
            }}>
            Frequently Asked {'\n'} Questions
          </Text>
        </View>
      </View>

      <View style={{paddingHorizontal: 10, flex: 1}}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          //   initialLayout={{width: layout.width}}
          initialLayout={{width: Dimensions.get('window').width}}
        />
      </View>

      {/* <ScrollView></ScrollView> */}
    </View>
  );
};

export default LegalandFaq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  header: {
    width: '100%',
    backgroundColor: COLORS.primary,
    minHeight: 100,
  },

  accordionContent: {
    elevation: 0.2,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  accordionTitle: {
    color: '#808285',
    color: COLORS.dark,
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingRight: 50,
    width: '90%',
  },
  accordionBody: {
    color: COLORS.dark,
    fontSize: 12,
    lineHeight: 20,
    opacity: 0.8,
  },
});

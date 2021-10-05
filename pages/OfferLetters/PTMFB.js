import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../util';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import Unorderedlist from 'react-native-unordered-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {formatNumber} from '../../util/numberFormatter';
import moment from 'moment';

export default function PTMFB(props) {
  const {navigation} = props;

  // Stamp Duty calc = approved_amount * 0.125

  const [offerLetterData, setOfferLetterData] = useState({
    userName: '',
    address: '',
    lender: '',
    primary_obligor: '',
    facility_type: '',
    facility_amount: '',
    purpose: '',
    tenor: '',
    interest_rate: '',
    stamp_duty: '',
    effective_date: '',
    maturity_date: '',
    processing_fee: '',
    insurance: '',
    repayment_plan_monthly_source: '',
  });

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;

    // console.log("hello here is our data ",JSON.parse(userData));
    // if (userData) {
    //   setName(JSON.parse(userData).user.lastname+" "+JSON.parse(userData).user.firstname);
    // }
  };

  useEffect(() => {
    populateOfferLetter();
  }, []);

  const populateOfferLetter = async () => {
    const token = await getToken();
    const user = await getUserData();

    // console.log('The User: ', user);

    try {
      const application = await axios.get(
        'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      const data = application.data.data;

      const purpose_check = 'Want to pay for a new place';

      setOfferLetterData({
        userName: user.firstname + ' ' + user.lastname,
        address:
          offerLetterData.purpose.toLowerCase() == purpose_check.toLowerCase()
            ? data.next_rent_address
            : data.home_address,
        facility_type: 'RENTAL LOAN',
        facility_amount: data.approvedamount,
        purpose: data.accomodationstatus,
        tenor: data.approved_repayment_plan,
        stamp_duty: data.approvedamount * 0.00125 + 200,
        effective_date: moment(data.approveddate).format('Do MMMM, YYYY'),
        // maturity_date: moment(data.approveddate)
        //   .add(Number(data.approved_repayment_plan), 'months')
        //   .format('Do MMMM, YYYY'),
        maturity_date: moment(data.remita_repayment_date).format(
          'Do MMMM, YYYY',
        ),
        repayment_plan_monthly_source: data.approvedrepayment,
      });

      console.log('Application: ', application.data.data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const offers = [
    {
      title: 'Lender',
      content: `Personal Trust Microfinance Bank Limited (“Personal Trust” or “The Bank”)`,
    },
    {
      title: 'Primary Obligor',
      content: `${offerLetterData?.userName.toString().toUpperCase()}`,
    },
    {
      title: 'Facility Type',
      content: `${offerLetterData.facility_type}`,
    },
    {
      title: 'Facility Amount',
      content: `₦${formatNumber(offerLetterData.facility_amount)}`,
    },
    {
      title: 'Purpose',
      content: `${offerLetterData.purpose}`,
    },
    {
      title: 'Tenor',
      content: `${
        offerLetterData.tenor <= 1
          ? offerLetterData.tenor + ' Month'
          : offerLetterData.tenor + ' Months'
      } (Meanwhile repayable on demand)`,
      // content: `12 Months (Twelve months, meanwhile repayable on demand)`,
    },
    {
      title: 'Interest rate',
      content: `3.9% flat monthly (this shall however be subject to change, in line with Money market conditions)`,
    },
    {
      title: 'Stamp Duty',
      content: `₦${formatNumber(offerLetterData.stamp_duty)}`,
      // content: `(Offer Letter N500.00+200.00)`,
    },
    {
      title: 'Effective Date',
      content: `${offerLetterData.effective_date}`,
      // content: `25th August, 2021.`,
    },
    {
      title: 'Maturity Date',
      content: `${offerLetterData.maturity_date}`,
      // content: `24th September, 2022. `,
    },
    {
      title: 'Processing fee',
      content: `1% flat (one off) `,
    },
    {
      title: 'Insurance',
      content: `2% flat (one off)`,
    },
    // !TODO: convert amount to words
    {
      title: `Repayment Plan\nMonthly&Source`,
      content: `Repayment of ₦${formatNumber(
        offerLetterData.repayment_plan_monthly_source,
      )} from salary. `,
    },
    {
      title: 'Securities',
      content: `Execution or activation of remita or other direct debit mandates on customer salary account with monthly repayment of ₦${formatNumber(
        offerLetterData.repayment_plan_monthly_source,
      )}.`,
    },
  ];

  const conditions = [
    {
      content: `Approval of any request for extension of the facility at the expiration of the tenor hereby provided shall be at the discretion of the Bank and shall be subject to processing/insurance fee of 3% flat for a new tenor as may be approved. \n\nA restructuring fee of 1% shall also be applied where this becomes the case. 
      `,
    },
    {
      content: `In the event of default in the repayment of the facility or interest arising thereon or in compliance with the terms, conditions and covenants contained herein, the Bank reserves the right to call in the facility and demand immediate repayment of all outstanding on the facility. 
      `,
    },
    {
      content: `You hereby indemnify the Bank against any loss that might be incurred by the Bank as a result of any irregularity or incompleteness in the information contained in any documents submitted to the Bank.  
      `,
    },
    {
      content: `No failure or delay by the Bank in exercising any remedy, right or power herein shall operate as a waiver or impairment thereof nor shall it affect or impair any such remedies, power or right in respect of any other subsequent default.  
      `,
    },
    {
      content: `No change in the business operations and conditions (financial or otherwise) or other prospects shall affect the full repayment of the facility at maturity. 
      `,
    },
    {
      content: `If the facility is not liquidated at maturity or on due date, you shall pay a default/penalty fee of 1% flat per month on any outstanding until the facility is repaid in addition to any other charge and interest as may be demanded by the Bank.   
      `,
    },
    {
      content: `The charges created in favor of the Bank are all enforceable and you shall not take any steps to restrain, restrict or delay the Bank in taking steps to realize the security in the event of default. 
      `,
    },
    {
      content: `This facility shall be utilized strictly for the purpose stated above and on no condition(s) should it be utilized for any other purpose. 
      `,
    },
    {
      content: `You shall not default on any of the financial affirmative or negative covenants and assurances it had given the Bank in respect of the facility , its operations and conditions and in the event of default, it shall take steps immediately to rectify  the default, whether same is brought to its knowledge by the Bank or not, and in any case not later than three working days from the date the breach is communicated by the bank, failing which the Bank can proceed to realize the security provided for the facility.
      `,
    },
    {
      content: `Your account shall witness a minimum monthly turnover of 50% of the facility. 
      `,
    },
    {
      content: `You hereby agree and accept that the Bank shall be entitled to capitalize interest on this facility at the agreed rate both during and after expiry of the tenure granted until the facility is fully repaid or recovered. 
      `,
    },
    {
      content: `Funds received into the account when the principal and/or interest are past due, will be applied first to the overdue interest before the outstanding principal amount. 
      `,
    },
    {
      content: `This offer shall not be binding unless it is accepted and returned to the Bank within 30 days from the date of the offer letter. 
      `,
    },
    {
      content: `Without prejudice to the foregoing, the Bank reserves the right to vary, alter or amend any of the terms and conditions of the facility as and when the need arises to do so. 
      `,
    },
  ];

  const warrant = [
    {
      content: `The obligor has the right to accept the facility and has taken all necessary actions to authorize same upon the terms and conditions herein. `,
    },
    {
      content:
        'That the acceptance of this facility will not be or result in a breach of or default under any provision of any other agreement to which the obligor is a party. ',
    },
  ];

  const EventsData = [
    {
      content: `If the obligor fails to settle any outstanding amount owed to and advised by the Bank when due; or `,
    },
    {
      content: `If a bankruptcy petition is presented against the obligor; or  `,
    },
    {
      content: `If a distress or execution is levied upon or issued against the property and is not discharged within 10 days or; `,
    },
    {
      content: `If the obligor is unable to pay any other party within the meaning of Section 1 of the Bankruptcy Act (Cap 30) Laws of Federation of Nigeria 1990; or  `,
    },
    {
      content: `If a situation arises which in the opinion of the Bank makes it inappropriate for the Bank to continue to extend the Facility to you; or`,
    },
    {
      content: `If you default in the performance or observance of any other term, condition or covenant applicable to the facility and such breach shall continue remedied for a period of 10 working days after notice thereof has been given to the obligor.       `,
    },
  ];

  const defaultsData = [
    {
      content: `If the obligor fails to pay any sum (of principal, interest or otherwise) due or to become due hereunder, the obligor shall be liable to a default fee of 1% flat per month on the un-repaid portion on the facility. This fee, will be in addition to the ongoing interest rate. `,
    },
    {
      content: `Duties and other fees incurred by the Bank in the processing of this facility and enforcement of security and recovery of the facility in the event of default will be borne by the obligor. `,
    },
  ];

  const otherData = [
    {
      title: `CREDIT BUREAU`,
      content: `The obligor irrevocably and unconditionally consents and authorizes the Bank to provide any and all information on this facility to Credit Bureaus/Registries. `,
    },
    {
      title: `RIGHT OF SET-OFF`,
      content: `The obligor covenants that in addition to any general lien or similar right to which the Bank may be entitled by law, the Bank may at any time and without notice to the obligor towards the satisfaction of the debt, set off any outstanding sum owed by the obligor against any amount standing to the obligor's credit in any bank account or other financial institution. `,
    },
    {
      title: `AVAILABILITY`,
      content: `Notwithstanding the terms and conditions under this agreement, this facility is repayable on demand at any time. Similarly, disbursements under this agreement are subject to availability of funds and the conditions of this facility may be varied at the discretion of the Bank and same will be communicated to the customer. `,
    },
    {
      title: `VALIDITY CLAUSE `,
      content: `This offer will lapse at the instance of Personal Trust if not accepted within seven (7) days from the date of this letter. If the terms and conditions of this facility are acceptable to you, kindly sign this offer letter. 
      `,
    },
  ];
  return (
    <View style={[styles.container]}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          paddingVertical: 15,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          onPress={() => navigation.navigate('Borrow')}
          name="arrow-back-outline"
          size={20}
          style={{
            marginRight: 20,
          }}
          color={COLORS.white}
        />
        <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
          Offer Letter / Rent Agreement
        </Text>
      </View>
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <View style={[styles.content]}>
          <View>
            <Text style={[styles.date]}>
              {offerLetterData.effective_date}.{'\n'}
            </Text>
            <Text style={[styles.address, {width: 100, marginBottom: 10}]}>
              {offerLetterData.address}
            </Text>
          </View>
          <Text style={[styles.attention]}>
            {/* ATTENTION: OGUNLEYE STEPHEN SANMMY */}
            ATTENTION: {offerLetterData?.userName.toString().toUpperCase()}
          </Text>

          <View style={[styles.section]}>
            <Text style={[styles.heading]}>OFFER OF CREDIT FACILITY</Text>
            <Text style={[styles.bodyText]}>
              We are pleased to advise you that the Management of Personal Trust
              Microfinance Bank Limited has approved your request for a ₦
              {formatNumber(offerLetterData.facility_amount)} facility under the
              following terms and conditions:
            </Text>
          </View>

          <View style={[styles.section]}>
            {offers?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      marginRight: 10,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                      marginTop: -2,
                      // width: 300,
                      // maxWidth: '100%',
                    }}>
                    {item.title}:
                  </Text>
                  <Text style={{flex: 1, fontSize: 12, color: COLORS.primary}}>
                    {item.content}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={[styles.section]}>
            <Text style={[styles.heading]}>
              CONDITIONS PRECEDENT TO DRAWDOWN
            </Text>
            <View style={[styles.listContainer]}>
              <Unorderedlist>
                <Text style={[styles.listText]}>
                  Acceptance of Offer letter by the Customer.
                </Text>
              </Unorderedlist>
              <Unorderedlist>
                <Text style={[styles.listText]}>
                  Payment of all upfront fees.
                </Text>
              </Unorderedlist>
            </View>
          </View>

          <View style={[styles.section]}>
            <Text style={[styles.heading]}>OTHER CONDITIONS</Text>

            <View style={{marginTop: 10}}>
              {conditions?.map((item, index) => {
                return (
                  <View key={index}>
                    <Unorderedlist
                      bulletUnicode={0x29bf}
                      style={{marginRight: 10, marginTop: 5}}
                      color={COLORS.primary}>
                      <Text style={[styles.listText]}>{item.content}</Text>
                    </Unorderedlist>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={[styles.section]}>
            <Text style={[styles.heading]}>RIGTH OF SET-OFF </Text>
            <Text style={[styles.bodyText]}>
              You hereby covenant that in addition to any general lien or
              similar right, to which the Bank as a banker may be entitled by
              law, the Bank may anytime and without notice to you combine or
              consolidate all or any other accounts with any liabilities to the
              Bank and set off or transfer any sum or sums standing to the
              credit of anyone or more of such accounts in or towards
              satisfaction of your liabilities to the Bank or any other respect
              whether such liabilities be actual or contingent primary or
              collateral and several or joint. {'\n\n'}All expenses and costs
              incurred in the perfection of securities including legal fees and
              charges as well as the recovery of the facility shall be from your
              account for which the Bank shall debit accordingly.
            </Text>
          </View>

          <View style={[styles.section]}>
            <Text style={[styles.heading]}>UTILIZATION</Text>
            <Text style={[styles.bodyText]}>
              This facility must be utilized within 7 days from the date of
              acceptance of offer failing which it shall attract a commitment
              fee of 1%.
            </Text>
          </View>

          <View style={[styles.section]}>
            <Text style={[styles.heading]}>REPAYMENT</Text>
            <Text style={[styles.bodyText]}>
              The Customer or any of the obligors may repay the full facility or
              any portion thereof before the expiration of the facility provided
              that notice of such prepayment is formally given to the Bank.
            </Text>
          </View>

          <View style={[styles.section]}>
            <Text style={[styles.heading]}>
              REPRESENTATIONS AND WARRANTIES{' '}
            </Text>
            <Text style={[styles.bodyText]}>
              The obligor represents and warrants that:
            </Text>

            <View style={{marginTop: 10}}>
              {warrant?.map((item, index) => {
                return (
                  <View key={index} style={{marginTop: 5}}>
                    <Unorderedlist
                      bulletUnicode={0x2022}
                      style={{marginRight: 10, marginTop: 5}}
                      color={COLORS.primary}>
                      <Text style={[styles.listText]}>{item.content}</Text>
                    </Unorderedlist>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={[styles.section]}>
            <Text style={[styles.heading]}>EVENTS OF DEFAULT</Text>
            <Text style={[styles.bodyText]}>
              The occurrence of any of the following events shall cause all
              outstanding repayments to become immediately payable by the
              obligor;
            </Text>

            <View style={{marginTop: 10}}>
              {EventsData?.map((item, index) => {
                return (
                  <View key={index} style={{marginTop: 5}}>
                    <Unorderedlist
                      bulletUnicode={0x2022}
                      style={{marginRight: 10, marginTop: 5}}
                      color={COLORS.primary}>
                      <Text style={[styles.listText]}>{item.content}</Text>
                    </Unorderedlist>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={[styles.section]}>
            <Text style={[styles.heading]}>DEFAULT</Text>

            <View style={{marginTop: 10}}>
              {defaultsData?.map((item, index) => {
                return (
                  <View key={index} style={{marginTop: 5}}>
                    <Unorderedlist
                      bulletUnicode={0x2022}
                      style={{marginRight: 10, marginTop: 5}}
                      color={COLORS.primary}>
                      <Text style={[styles.listText]}>{item.content}</Text>
                    </Unorderedlist>
                  </View>
                );
              })}
            </View>
          </View>

          {otherData?.map((item, index) => {
            return (
              <View style={[styles.section]} key={index}>
                <View style={{marginTop: 10}}>
                  <Text style={[styles.heading]}>{item.title}</Text>
                  <Text style={[styles.bodyText]}>{item.content}</Text>
                </View>
              </View>
            );
          })}

          <View style={[styles.section]}>
            <Text style={[styles.bodyText]}>Yours faithfully</Text>
            <Text style={[styles.heading]}>
              For: Personal Trust Microfinance Bank Limited
            </Text>
            <Text style={[styles.bodyText, {marginTop: 20}]}>
              Please signify your acceptance of the above terms and conditions
              by signing the acceptance column
            </Text>
            <Text style={[styles.bodyText, {marginTop: 20}]}>
              We thank you for your continued patronage and look forward to a
              more fruitful banking relationship with you.
            </Text>
            <Text style={[styles.bodyText, {marginTop: 20}]}>
              Yours faithfully,
            </Text>
          </View>

          <View style={[styles.section]}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={[styles.heading]}>Head Credit/Risk</Text>
                <Text style={[styles.bodyText, {marginTop: 0}]}>
                  Adekunle Ojo
                </Text>
              </View>

              <View>
                <Text style={[styles.heading]}>Managing Director </Text>
                <Text style={[styles.bodyText, {marginTop: 0}]}>
                  Bakare Edeki{' '}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.section]}>
            <Text style={[styles.heading]}>ACCEPTANCE</Text>
            <Text style={[styles.bodyText]}>
              All the terms and conditions of this offer letter are accepted by
              me/us{' '}
            </Text>
          </View>

          <View style={[styles.section]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
              <View>
                <Text style={[styles.heading]}>{offerLetterData.userName}</Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: COLORS.primary,
                    marginBottom: 2,
                  }}
                />
                <Text style={[styles.heading]}>Customer Name </Text>
              </View>

              <View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: COLORS.primary,
                    marginBottom: 2,
                  }}
                />
                <Text style={[styles.heading]}>Signature and Date </Text>
              </View>
            </View>
          </View>

          {/* end */}
        </View>
      </ScrollView>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          paddingVertical: 10,
          backgroundColor: COLORS.white,
          position: 'absolute',
          width: '100%',
          bottom: 0,
          borderTopWidth: 1,
          borderTopColor: '#BFBFBF50',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Reject')}
          style={[
            designs.button,
            {backgroundColor: COLORS.white, elevation: 1, width: '43%'},
          ]}>
          <Text
            style={[
              {
                fontSize: 12,
                color: COLORS.dark,
                textAlign: 'center',
                fontWeight: 'bold',
              },
            ]}>
            REJECT OFFER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signature')}
          style={[
            designs.button,
            {backgroundColor: COLORS.secondary, elevation: 1, width: '43%'},
          ]}>
          <Text
            style={[
              {
                fontSize: 12,
                color: COLORS.white,
                textAlign: 'center',
                fontWeight: 'bold',
              },
            ]}>
            ACCEPT &amp; SIGN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 30,
    marginBottom: 50,
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    lineHeight: 25,
  },
  address: {
    fontSize: 14,
    fontWeight: 'normal',
    color: COLORS.primary,
    lineHeight: 25,
  },
  attention: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
  },
  section: {
    marginVertical: 20,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    // textDecorationLine: 'underline',
  },
  bodyText: {
    fontSize: 13,
    fontWeight: 'normal',
    color: COLORS.primary,
    lineHeight: 25,
    marginTop: 5,
    // paddingLeft: 10,
  },

  listContainer: {
    marginTop: 10,
  },
  listText: {
    lineHeight: 25,
    fontSize: 13,
    fontWeight: 'normal',
    color: COLORS.primary,
    // marginVertical: 5,
  },
});

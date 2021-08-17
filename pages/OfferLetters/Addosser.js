import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import designs from './style';
import {COLORS, images} from '../../util/';

export default function AddosserLetter({navigation}) {
  const data = [
    {title: 'Lender:', value: 'Addosser Finance Limited'},
    {title: 'Borrower:', value: 'JOSHUA NWOSU'},
    {title: 'Facility type:', value: 'Consumer Loan'},
    {title: 'Purpose:', value: 'Personal loan'},
    {title: 'Principal Amount:', value: '100,000'},
    {title: 'Interest rate:', value: '3.9% Flat Per Month'},
    {title: 'Management Fee:', value: '0.5% flat of loan amount'},
    {title: 'Tenor:', value: '6 Months'},
    {
      title: 'Disbursement Date:',
      value:
        '11/03/2020 which could be varied subject to the fulfilment of the Conditions precedent to drawdown and the disbursement date specified in the repayment schedule which forms an integral part of this offer letter.',
    },
    {
      title: 'Expiry Date:',
      value: '28/08/2021 which could also be varied as indicated above',
    },
    {title: 'Repayment Date:', value: '28th of Every Month'},
    {title: 'Repayment Commencement Date', value: '28/03/2021'},
    {
      title: 'Repayment:',
      value:
        'Monthly installment payment of N20, 566.67 as evidenced by REMITA MANDATE',
    },
    {title: 'Create Life insurance charge:', value: '1% flat of loan amount'},
  ];

  const conditionA = [
    {id: 1, content: 'Duly Completed Application Form'},
    {id: 2, content: 'Executed Offer Letter.'},
    {
      id: 3,
      content:
        'Copy of Last Three Months’ Bank statement evidencing Salary payment.',
    },
    {
      id: 4,
      content:
        'REMITA MANDATE in the sum of N123, 400.00 representing principal plus Interest.',
    },
    {
      id: 5,
      content:
        'Credit life insurance policy of 1% of the sum of N100, 000.00 with Addosser Finance Limited noted as first loss beneficiary.',
    },
  ];

  const conditionB = [
    {
      id: 1,
      content:
        'Please note that, upon default, facility will attract the current interest rate of 3.9% flat per month and default charge of 1% flat per month of the outstanding amount.',
    },
    {id: 2, content: '7.5% VAT will be applicable on all fees.'},
    {
      id: 3,
      content:
        'In addition, loan recovery expenses will be borne by the Client.',
    },
    {
      id: 4,
      content:
        'In the event, that two consecutive rentals remain unpaid, the lender reserves the right to call in the facility and the outstanding amount on the facility shall become payable immediately. ',
    },
    {
      id: 5,
      content:
        'Where borrower intends to pre liquidate the loan before the expiration period, the borrower is not required to pay any fees or charges',
    },
  ];

  const conditionC = [
    {
      id: 1,
      content:
        'To repay the loan as and when due and further agrees that in the event of default on loan repayment, the bank shall have the right to report the delinquent loan to the CBN through the Credit Risk Management System (CRMS) or by any other means, and request the CBN to exercise its regulatory power to direct all banks and other financial institutions under its regulatory purview to set-off his/her indebtedness to the lender from any money standing to its credit in any bank account and from any other financial assets that may be holding for its benefit.',
    },
    {
      id: 2,
      content:
        'That the lender shall have power to set-off his indebtedness under this loan agreement from all such monies and funds standing to his credit/benefit in any and all such accounts or from any other financial assets belonging to him and in the custody of any such bank.',
    },
    {
      id: 3,
      content:
        'Not to issue cheques against unfunded account(s) as instrument of repayment. In the event any of my cheques return, the bank reserves the right to take remedial action against me for the recovery of the loan subject to Clause C6 herein.',
    },
    {
      id: 4,
      content:
        'Waives any right of confidentiality whether arising under common law or statute or in any other manner whatsoever and irrevocably agrees that he shall not argue to the contrary before any court of law, tribunal, administrative authority or any other body acting in any judicial or quasi-judicial capacity.',
    },
    {
      id: 5,
      content:
        'Where the borrower defaults on a credit obligation, the bank shall request the CBN to invoke the utilization of the defaulting borrower(s) deposits in other banks in repayment of the obligation.',
    },
    {
      id: 6,
      content:
        'Any case of a dud or returned repayment instrument or cheque shall be reported and taken up with the authorities who shall not be limited to the EFCC where the borrower refuses to regularize his account Seven (7) Days after the cheque returns.',
    },
  ];
  return (
    <>
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <View style={[designs.container]}>
          {/* <Text>Addosser Letter - new</Text> */}
          <View style={[designs.topNav]}>
            <View style={[designs.topNavLogo]}>
              <Image
                source={images.addosserLogo}
                style={{
                  width: 100,
                  height: 100,
                }}
                resizeMode="contain"
              />
            </View>
            <View style={[designs.topNavAddress]}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                  lineHeight: 25,
                }}>
                27, Ribadu Road,{'\n'}
                Off Awolowo Road,{'\n'}
                Ikoyi, Lagos{'\n'}
                0812 251 8506{'\n'}
                www.addosserfinance.com
              </Text>
            </View>
          </View>
          <View style={[designs.userAddress]}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.primary,
                lineHeight: 25,
              }}>
              09/03/2021{'\n'}
              JOSHUA NWOSU {'\n'}
              15 LAWAL STREET,{'\n'}
              IYANA IPAJA,{'\n'}
              LAGOS.
            </Text>
          </View>

          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.primary,
                lineHeight: 25,
              }}>
              Dear Sir/Ma,
            </Text>
          </View>

          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: COLORS.primary,
                lineHeight: 25,
                textAlign: 'center',
                textDecorationLine: 'underline',
              }}>
              RE: OFFER OF N100, 000.00 CONSUMER LOAN FACILITY
            </Text>
          </View>

          <View style={{marginTop: 10}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.primary,
                lineHeight: 25,
              }}>
              Further to your application dated 09/03/2021 we are pleased to
              convey to you our management’s approval to grant your facility
              under the following terms and conditions:
            </Text>
          </View>

          <View style={{marginTop: 40}}>
            {data.map((item, index) => {
              return (
                <View key={index} style={[designs.flexItem]}>
                  <Text style={[designs.flexItemText, {fontSize: 10}]}>
                    {item.title}
                  </Text>
                  <Text style={[designs.flexItemText, {fontWeight: 'bold'}]}>
                    {item.value}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: COLORS.primary,
                lineHeight: 25,
                textAlign: 'left',
                textDecorationLine: 'underline',
              }}>
              A{'     '}CONDITIONS PRECEDENT
            </Text>

            {conditionA.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                    alignItems: 'flex-start',
                    paddingRight: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                      lineHeight: 25,
                      marginRight: 10,
                    }}>
                    {index + 1}.
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                      lineHeight: 25,
                    }}>
                    {item.content}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: COLORS.primary,
                lineHeight: 25,
                textAlign: 'left',
                textDecorationLine: 'underline',
              }}>
              B{'     '}OTHER CONDITION(s)
            </Text>
            {conditionB.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                    alignItems: 'flex-start',
                    paddingRight: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                      lineHeight: 25,
                      marginRight: 10,
                    }}>
                    {index + 1}.
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                      lineHeight: 25,
                    }}>
                    {item.content}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: COLORS.primary,
                lineHeight: 25,
                textAlign: 'left',
                textDecorationLine: 'underline',
              }}>
              C.{'     '}THE BORROWER COVENANTS AND WARRANTS AS FOLLOWS:
            </Text>
            {conditionC.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                    alignItems: 'flex-start',
                    paddingRight: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                      lineHeight: 25,
                      marginRight: 10,
                    }}>
                    {index + 1}.
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                      lineHeight: 25,
                    }}>
                    {item.content}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 12,
                //   fontWeight: 'bold',
                color: COLORS.primary,
                lineHeight: 25,
              }}>
              Yours faithfully,
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.primary,
                lineHeight: 25,
              }}>
              For: Addosser Finanace Limited
            </Text>
          </View>

          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: COLORS.primary,
                lineHeight: 25,
                textAlign: 'center',
                textDecorationLine: 'underline',
              }}>
              ACCEPTANCE OF OFFER BY CLIENT
            </Text>
          </View>

          <View style={{marginTop: 10}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.primary,
                lineHeight: 25,
              }}>
              All the terms and conditions have been read and understood by me,
              I JOSHUA NWOSU hereby accept the terms and conditions as evidenced
              by my signature:
            </Text>
          </View>

          <View style={{marginTop: 10}}>
            {['BVN:', 'SIGNATURE:', 'DATE:'].map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                    }}>
                    {item}
                  </Text>
                  <View
                    style={{
                      width: 200,
                      height: 50,
                      borderBottomColor: COLORS.primary,
                      borderBottomWidth: 1,
                      borderStyle: 'dashed',
                      marginLeft: 10,
                    }}></View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          //   marginBottom: 19,
          //   marginTop: 20,
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          paddingVertical: 10,
          backgroundColor: COLORS.white,

          //   borderTopColor: COLORS.grey,
          //   borderTopWidth: 1,
          position: 'absolute',
          width: '100%',
          bottom: 0,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Reject')}
          style={[
            designs.button,
            {backgroundColor: COLORS.white, elevation: 1, width: '43%'},
          ]}>
          <Text
            style={[
              designs.buttonText,
              {
                fontSize: 12,
                color: '#777',
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
              designs.buttonText,
              {
                fontSize: 12,
                color: COLORS.white,
                textAlign: 'center',
                fontWeight: 'bold',
              },
            ]}>
            ACCEPT OFFER
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

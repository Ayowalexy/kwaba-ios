import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import axios from 'axios';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';

const AcceptanceLetterKwaba = ({navigation}) => {
  const [name, setName] = useState('');
  const today = moment().format('DD/MM/YYYY');
  const [eSignatureModal, setESignatureModal] = useState(false);
  const [acceptOfferResponse, setAcceptOfferResponse] = useState({});
  const [approvedAmount, setApprovedAmount] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [duration, setDuration] = useState('');
  const [percentAchieved, setPercentAchieved] = useState(75);
  const [nextPaymentDueDate, setnextPaymentDueDate] = useState(45);
  const [noOfDaysToNextPayment, setnoOfDaysToNextPayment] = useState(45);
  const [repaymentBalance, setrepaymentBalance] = useState(45);
  const [monthlyRepayment, setmonthlyRepayment] = useState();
  const [repaymentPlan, setrepaymentPlan] = useState();
  const [repaymentPlanCount, setrepaymentPlanCount] = useState();
  const [approved_amount, setapproved_amount] = useState();
  const [address, setaddress] = useState();
  const [workplace, setworkplace] = useState();
  const [repayment_day, setrepayment_day] = useState();
  const [totalrepayment, settotalrepayment] = useState();
  const [repayment_amount, setrepayment_amount] = useState();
  const [repayment_start_day, setrepayment_start_day] = useState();

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const setLoanOffer = async () => {
    const token = await getToken();
    const applicationIDCallRes = await axios.get(
      'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/one',
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );

    setApprovedAmount(applicationIDCallRes.data.data.loanable_amount);
    setMonthlyPayment(applicationIDCallRes.data.data.monthly_repayment);
    setDuration(applicationIDCallRes.data.data.repayment_plan);

    console.log(applicationIDCallRes.data.data);
  };

  useEffect(() => {
    const getinitialData = async () => {
      const token = await getToken();

      try {
        const applicationIDCallRes = await axios.get(
          'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/one',
          {
            headers: {'Content-Type': 'application/json', Authorization: token},
          },
        );

        console.log(applicationIDCallRes.data.data.non_refundable_deposit);
        const loanId = applicationIDCallRes.data.data.id;
        setmonthlyRepayment(
          Number(applicationIDCallRes.data.data.approvedrepayment),
        );
        setrepaymentPlan(
          applicationIDCallRes.data.data.approved_repayment_plan,
        );
        setapproved_amount(applicationIDCallRes.data.data.approvedamount);
        setaddress(applicationIDCallRes.data.data.home_address);
        setworkplace(applicationIDCallRes.data.data.employer_name);

        const res = await axios.post(
          'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/dashboard',
          {loanId},
          {
            headers: {'Content-Type': 'application/json', Authorization: token},
          },
        );

        console.log(res.data);
        setPercentAchieved(res.data.percentagePaid);
        setnextPaymentDueDate(res.data.nextPaymentDueDate);
        setnoOfDaysToNextPayment(res.data.noOfDaysToNextPayment);
        setrepaymentBalance(res.data.repaymentBalance);
        setrepaymentPlanCount(res.data.loanpaidcount);
        setrepayment_day(res.data.nextPaymentDueDate);

        const date = moment(res.data.noOfDaysToNextPayment); // Thursday Feb 2015
        const dow = date.day();
        setrepayment_start_day(dow);

        settotalrepayment(Number(repaymentPlan * monthlyRepayment));
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getinitialData();

    const getUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');

      console.log('hello here is our data ', JSON.parse(userData));
      if (userData) {
        setName(
          JSON.parse(userData).user.lastname +
            ' ' +
            JSON.parse(userData).user.firstname,
        );
      }
    };
    getUserData();
    setLoanOffer();
  }, []);

  const handleRejectOffer = () => {
    Alert.alert('Offer Rejected', 'Offer Rejected.');
  };

  return (
    <>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <WebView
          source={{
            html: `<html>
   
               <head>
               <meta http-equiv=Content-Type content="text/html; charset=utf-8">
               <meta name=Generator content="Microsoft Word 15 (filtered)">
               <meta name="viewport" content="width=device-width, initial-scale=1">
               <style>
               <!--
                /* Font Definitions */
                @font-face
                   {font-family:Wingdings;
                   panose-1:5 0 0 0 0 0 0 0 0 0;}
               @font-face
                   {font-family:"Cambria Math";
                   panose-1:2 4 5 3 5 4 6 3 2 4;}
               @font-face
                   {font-family:Calibri;
                   panose-1:2 15 5 2 2 2 4 3 2 4;}
               @font-face
                   {font-family:Questrial;}
               @font-face
                   {font-family:Times;
                   panose-1:2 2 6 3 5 4 5 2 3 4;}
               @font-face
                   {font-family:"Times New Roman\,Bold";}
               @font-face
                   {font-family:Garamond;
                   panose-1:2 2 4 4 3 3 1 1 8 3;}
               @font-face
                   {font-family:"Comic Sans MS";
                   panose-1:3 15 7 2 3 3 2 2 2 4;}
                /* Style Definitions */
                p.MsoNormal, li.MsoNormal, div.MsoNormal
                   {margin-top:0in;
                   margin-right:0in;
                   margin-bottom:10.0pt;
                   margin-left:0in;
                   line-height:115%;
                   font-size:11.0pt;
                   font-family:"Calibri",sans-serif;}
               p.MsoHeader, li.MsoHeader, div.MsoHeader
                   {mso-style-link:"Header Char";
                   margin:0in;
                   font-size:11.0pt;
                   font-family:"Calibri",sans-serif;}
               p.MsoFooter, li.MsoFooter, div.MsoFooter
                   {mso-style-link:"Footer Char";
                   margin:0in;
                   font-size:11.0pt;
                   font-family:"Calibri",sans-serif;}
               a:link, span.MsoHyperlink
                   {color:#0563C1;
                   text-decoration:underline;}
               p
                   {margin-right:0in;
                   margin-left:0in;
                   font-size:12.0pt;
                   font-family:"Times New Roman",serif;}
               p.MsoListParagraph, li.MsoListParagraph, div.MsoListParagraph
                   {margin-top:0in;
                   margin-right:0in;
                   margin-bottom:10.0pt;
                   margin-left:.5in;
                   line-height:115%;
                   font-size:11.0pt;
                   font-family:"Calibri",sans-serif;}
               p.MsoListParagraphCxSpFirst, li.MsoListParagraphCxSpFirst, div.MsoListParagraphCxSpFirst
                   {margin-top:0in;
                   margin-right:0in;
                   margin-bottom:0in;
                   margin-left:.5in;
                   line-height:115%;
                   font-size:11.0pt;
                   font-family:"Calibri",sans-serif;}
               p.MsoListParagraphCxSpMiddle, li.MsoListParagraphCxSpMiddle, div.MsoListParagraphCxSpMiddle
                   {margin-top:0in;
                   margin-right:0in;
                   margin-bottom:0in;
                   margin-left:.5in;
                   line-height:115%;
                   font-size:11.0pt;
                   font-family:"Calibri",sans-serif;}
               p.MsoListParagraphCxSpLast, li.MsoListParagraphCxSpLast, div.MsoListParagraphCxSpLast
                   {margin-top:0in;
                   margin-right:0in;
                   margin-bottom:10.0pt;
                   margin-left:.5in;
                   line-height:115%;
                   font-size:11.0pt;
                   font-family:"Calibri",sans-serif;}
               span.HeaderChar
                   {mso-style-name:"Header Char";
                   mso-style-link:Header;}
               span.FooterChar
                   {mso-style-name:"Footer Char";
                   mso-style-link:Footer;}
               span.msoIns
                   {mso-style-name:"";
                   text-decoration:underline;
                   color:teal;}
               span.msoDel
                   {mso-style-name:"";
                   text-decoration:line-through;
                   color:red;}
               .MsoChpDefault
                   {font-size:12.0pt;
                   font-family:"Calibri",sans-serif;}
                /* Page Definitions */
                @page WordSection1
                   {size:595.3pt 841.9pt;
                   margin:1.0in 1.0in 1.0in 1.0in;}
               div.WordSection1
                   {page:WordSection1;}
                /* List Definitions */
                ol
                   {margin-bottom:0in;}
               ul
                   {margin-bottom:0in;}
               -->
               </style>
               
               </head>
               
               <body lang=EN-US link="#0563C1" vlink="#954F72" style='word-wrap:break-word'>
               
               <div class=WordSection1>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:12.0pt;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoNormal align=center style='text-align:center;line-height:normal'><b><span
               lang=EN-GB style='font-size:12.0pt;font-family:"Times",serif'>RENT FINANCING
               OFFER LETTER</span></b></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>${today}</span></p>
               
               <p class=MsoNormal style='line-height:normal'><b><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>${name}<br>
               Duport Marine Limited </span></b></p>
               
               <p class=MsoNormal style='line-height:normal'><b><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>42 Alexander
               Avenue, Ikoyi</span></b></p>
               
               <p class=MsoNormal style='line-height:normal'><b><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>Lagos State.</span></b></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>Dear Sir, </span></p>
               
               <p class=MsoNormal style='line-height:normal'><b><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>RE: OFFER OF N120,000
               RENTAL FINANCING FACILITY</span></b></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>Further to your
               application dated </span><span lang=EN-GB style='font-size:9.0pt;font-family:
               "Times New Roman\,Bold"'>18/05/2020, </span><span lang=EN-GB style='font-size:
               9.0pt;font-family:"Times New Roman",serif'>we are pleased to grant you facility
               under the following terms and conditions; </span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>Lender: MKOBO (“the
               financier”)                                                        Borrower:</span><b><span
               lang=EN-GB style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'><span
               > ${name}</span></b></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>Purpose: <b>Rental
               Loan</b></span><span lang=EN-GB style='font-size:12.0pt;font-family:"Times New Roman",serif'>                                                         </span><span
               lang=EN-GB style='font-size:9.0pt;font-family:"Times New Roman",serif'>Tenor:<b>
               6 </b></span><b><span lang=EN-GB style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>Months
               </span></b></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>Principal Amount: </span><b><span
               lang=EN-GB style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>N120,000                                 </span></b><span
               lang=EN-GB style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>                                
               Commencement Date <b>:</b> <b>18/05/2020</b></span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>Repayment Date: <b>30<sup>th</sup></b></span><b><span
               lang=EN-GB style='font-size:12.0pt;font-family:"Times New Roman",serif'>          </span></b><span
               lang=EN-GB style='font-size:12.0pt;font-family:"Times New Roman",serif'>                                                </span><span
               lang=EN-GB style='font-size:9.0pt;font-family:"Times New Roman",serif'>Interest
               rate: <b>6% flat per month </b></span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>Expiry Date: <b>30/10/2020</b> 
                                                                                     First
               Repayment Date: <b>30/05/2020</b></span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>Monthly installment
               payment of </span><b><span lang=EN-GB style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>N27,200.00</span></b><span
               lang=EN-GB style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'> </span><span
               lang=EN-GB style='font-size:9.0pt;font-family:"Times New Roman",serif'>as
               evidenced by Direct Debit for 6 months </span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>CONDITIONS
               PRECEDENT </span><span lang=EN-GB style='font-size:9.0pt;font-family:"Times New Roman",serif'> </span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>1 &nbsp;Duly
               activated Direct Debit with salary account ATM card </span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>2&nbsp; Credit life
               Insurance Policy of 1.5% of the sum of </span><b><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>N120,000.00 </span></b><span
               lang=EN-GB style='font-size:9.0pt;font-family:"Times New Roman",serif'>with MKOBO
               Microfinance bank Noted as first loss Beneficiary. </span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>By accepting this
               offer, you accept Kwaba and its financial partners terms and conditions.</span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>Thank you.</span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>&nbsp;</span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>Name:                                                                                                                     Signature
               of applicant:</span></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoNormal><b><span lang=EN-GB style='font-size:16.0pt;line-height:
               115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoNormal><b><span lang=EN-GB style='font-size:16.0pt;line-height:
               115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoNormal><b><span lang=EN-GB style='font-size:16.0pt;line-height:
               115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoNormal><b><span lang=EN-GB style='font-size:16.0pt;line-height:
               115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoNormal><b><span lang=EN-GB style='font-size:16.0pt;line-height:
               115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>OTHER CONDITION(s) </span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>1 &nbsp;Please note
               that, upon default, facility will attract the current interest rate of 6% flat
               per month and default charge of 1% flat per month of the outstanding amount. </span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>2 &nbsp;In
               addition, loan recovery expenses will be borne by the Client. </span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman",serif'>3 &nbsp;</span><span
               lang=EN-GB style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'>In the
               event, that one month’s rent amount remains unpaid, Kwaba and its financial
               partners reserves the right to call in the facility and the outstanding amount
               on the facility shall become payable immediately. Notwithstanding whether the
               facility is part payment of the rent, Kwaba reserves the right to evict you
               from the financed property under 7 days in the event of 1 month payment
               default.</span></p>
               
               <p class=MsoNormal style='line-height:normal'><span lang=EN-GB
               style='font-size:9.0pt;font-family:"Times New Roman\,Bold"'><span class=msoIns><ins
               cite="mailto:Tripodis%20Legal%202" datetime="2021-01-21T18:06">4. Kwaba also
               reserves the right to possess and sell</ins></span><span class=msoIns><ins
               cite="mailto:Tripodis%20Legal%202" datetime="2021-01-21T18:14"> the Borrower’s</ins></span><span
               class=msoIns><ins cite="mailto:Tripodis%20Legal%202" datetime="2021-01-21T18:06">
               </ins></span><span class=msoIns><ins cite="mailto:Tripodis%20Legal%202"
               datetime="2021-01-21T18:15">belongings</ins></span><span class=msoIns><ins
               cite="mailto:Tripodis%20Legal%202" datetime="2021-01-21T18:06"> in the </ins></span><span
               class=msoIns><ins cite="mailto:Tripodis%20Legal%202" datetime="2021-01-21T18:15">P</ins></span><span
               class=msoIns><ins cite="mailto:Tripodis%20Legal%202" datetime="2021-01-21T18:06">roperty
               to recover outstanding debt in the event of a default</ins></span><span
               class=msoIns><ins cite="mailto:Tripodis%20Legal%202" datetime="2021-01-21T18:13">.</ins></span><span
               class=msoIns><ins cite="mailto:Tripodis%20Legal%202" datetime="2021-01-21T18:06">
               </ins></span></span></p>
               
               <p class=MsoNormal><b><span lang=EN-GB style='font-size:16.0pt;line-height:
               115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoNormal align=center style='text-align:center'><b><span lang=EN-GB
               style='font-size:12.0pt;line-height:115%;font-family:"Times",serif'>RENT
               FINANCING AGREEMENT </span></b></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>THIS AGREEMENT</span></b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>
               is made on this 18<sup>th</sup> day of May 2020 </span></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>Between</span></b></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times New Roman\,Bold"'>${name} </span></b><span lang=EN-GB style='font-size:9.0pt;line-height:
               115%;font-family:"Times",serif'>of </span><span lang=EN-GB style='font-size:
               9.0pt;line-height:115%;font-family:"Times",serif'>                                                                                                                   </span></p>
               
               <p class=MsoNormal style='text-align:justify'><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>(hereinafter
               referred to as ‘THE LESSEE’ which shall, where the context so admits, include
               its successors-in-title and assigns) of the second part.</span></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>And</span></b></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>KWABA
               INTERNATIONAL LIMITED</span></b><span lang=EN-GB style='font-size:9.0pt;
               line-height:115%;font-family:"Times",serif'>, a limited liability company
               incorporated under the Companies and Allied Matters Act 2004, having its
               registered  office at No. 18 Odunlami street, Anthony village - Lagos
               (hereinafter referred to as ‘THE FINANCIER’ which shall, where the context so
               admits, include its successors-in-title and assigns) of the third part.</span></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>WHEREAS:</span></b></p>
               
               <p class=MsoListParagraph style='text-align:justify;text-indent:-.25in'><b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>1.<span
               style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif;color:black'>The Lessee is desirous of renting the
               Property and the Financier has agreed to finance the property same subject to
               the terms and conditions herein stated.</span></p>
               
               <p style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:.5in;
               text-align:justify;text-indent:-.25in;line-height:115%;vertical-align:baseline'><b><span
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif;color:black'>2.<span
               style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><span style='font-size:9.0pt;line-height:115%;font-family:
               "Times",serif'>The Financier, <span style='color:black'>is a rent financing and
               management company that ventures into businesses, real estate residential and
               commercial arrangements for her benefit and has agreed to finance this Lease,
               subject to the terms and conditions contained herein. </span>                                                              </span></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>THIS
               AGREEMENT WITNESSES AS FOLLOWS:</span></b></p>
               
               <p class=MsoListParagraphCxSpFirst style='margin-left:45.0pt;text-align:justify;
               text-indent:-.25in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:
               115%;font-family:"Times",serif'>1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>DEFINITIONS</span></b></p>
               
               <p class=MsoListParagraphCxSpLast style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>In
               this Agreement unless the context otherwise requires the following terms shall
               have the following meanings:</span></p>
               
               <p class=MsoNormal style='margin-bottom:0in;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpFirst style='margin-top:0in;margin-right:0in;
               margin-bottom:0in;margin-left:.75in;text-align:justify;text-indent:-.25in'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Questrial",serif;
               color:black'>-<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif;color:black'>“Property”</span></b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif;color:black'>
               means the property particularly described in schedule I.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-top:0in;margin-right:0in;
               margin-bottom:0in;margin-left:.75in;text-align:justify;text-indent:-.25in'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Questrial",serif;
               color:black'>-<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif;color:black'>“Schedule”</span></b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif;color:black'>
               means the schedule to this Agreement annexed and subscribed by the parties
               hereto.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-top:0in;margin-right:0in;
               margin-bottom:0in;margin-left:.75in;text-align:justify;text-indent:-.25in'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Questrial",serif;
               color:black'>-<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif;color:black'>“Commencement Date” </span></b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif;
               color:black'>means the day and month this Agreement is to take effect as agreed
               by both parties hereunder.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-top:0in;margin-right:0in;
               margin-bottom:0in;margin-left:.75in;text-align:justify;text-indent:-.25in'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Questrial",serif;
               color:black'>-<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>“Expiration Date”</span></b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'> means the
               day and month this Agreement is to terminate as agreed by both parties
               hereunder.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle><b><span lang=EN-GB style='font-size:9.0pt;
               line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-top:0in;margin-right:0in;
               margin-bottom:0in;margin-left:.75in;text-align:justify;text-indent:-.25in'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Questrial",serif;
               color:black'>-<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>‘‘Rent’’ </span></b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>means amount
               due and payable by the Financier to the Landlord for the Term hereby granted
               which is </span><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times New Roman\,Bold"'>N120,000</span></b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'> (One
               hundred and twenty thousand Naira only) <b>per annum</b> for 1(one) year.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-top:0in;margin-right:0in;
               margin-bottom:0in;margin-left:.75in;text-align:justify;text-indent:-.25in'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Questrial",serif;
               color:black'>-<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoListParagraphCxSpLast style='margin-top:0in;margin-right:0in;
               margin-bottom:0in;margin-left:.75in;text-align:justify;text-indent:-.25in'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Questrial",serif;
               color:black'>-<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>‘’Total Rent’’ </span></b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>means the
               rent for each unit of the Demised Property including a 6% monthly interest rate
               for the term hereby granted which is <b>N163,200.00 </b>(One hundred and sixty-three
               thousand, two hundred Naira only)<b> payable monthly </b>by the Lessee to the
               Financier for <b>6 months.</b></span></p>
               
               <p class=MsoNormal style='margin-bottom:0in;text-align:justify'><b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoListParagraph style='margin-top:0in;margin-right:0in;margin-bottom:
               0in;margin-left:.75in;text-align:justify;text-indent:-.25in'><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Questrial",serif;
               color:black'>-<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>‘Term</span></b><span lang=EN-GB style='font-size:
               9.0pt;line-height:115%;font-family:"Times",serif'>’ means 1 year(s) certain
               from, and including the commencement date.</span></p>
               
               <p class=MsoNormal style='margin-bottom:0in;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoNormal style='margin-top:0in;margin-right:0in;margin-bottom:0in;
               margin-left:.5in;text-align:justify'><span lang=EN-GB style='font-size:9.0pt;
               line-height:115%;font-family:"Times",serif;color:black'>The parties agree that
               the recitals set forth above are true and correct and form an operative part of
               this Agreement.</span></p>
               
               <p class=MsoListParagraphCxSpFirst style='text-align:justify'><b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>LETTING</span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'> </span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>2.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>In consideration of the Rent of </span><b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times New Roman\,Bold"'>N120,000</span></b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>
               (<b>One hundred and twenty thousand Naira only)  </b></span><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>which stands
               as one year’s rent having been paid by the Financier to the Landlord of the
               property, the lessee hereby takes the </span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>2.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>Demised Property to hold for a term of One (1) year
               CERTAIN commencing on the 18<sup>th</sup><b> </b>day of May 2020 and expiring
               on the 18<sup>th</sup> day of May 2021</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>2.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>In consideration of the Total Rent of </span><b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>N163,200.00
               </span></b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:
               "Times",serif'>(One hundred and sixty-three thousand, two hundred Naira only)<b>
               </b></span><span lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:
               "Times",serif'>where</span><span lang=EN-GB style='font-size:9.0pt;line-height:
               115%;font-family:"Times",serif'> </span><b><span lang=EN-GB style='font-size:
               9.0pt;line-height:115%;font-family:"Times New Roman\,Bold"'>N27,200.00</span></b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times New Roman\,Bold"'>
               </span><span lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:
               "Times",serif'>stands as monthly rent due and payable by the Lessee to the Financier,
               the Landlord hereby lets and the Lessee hereby takes the Demised Property to
               hold for a term of One year CERTAIN commencing on the<b> </b>18<sup>th</sup><b>
               </b>day of May 2020 and expiring on the 18<sup>th</sup> day of May 2021</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>2.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>2.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>The Lessee being a monthly Tenant shall pay Rent in
               Paragraph 2.2 above on the stated date in the rent finance offer letter,
               failure of which will automatically terminate this Agreement and would be
               required to surrender possession within 48 hours after notice has been issued
               in respect of same.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>2.6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>Other<b> </b>conditions that may lead to
               termination/dissolution of this Agreement are contained in Schedule II to this
               Agreement. </span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>COMMENCEMENT </span></b></p>
               
               <p class=MsoListParagraphCxSpLast style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>2.7.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif;color:black'>This Agreement shall commence on </span><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>18<sup>th</sup><b>
               </b>day of May 2020</span></p>
               
               <p style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:9.0pt;
               text-align:justify;text-indent:.5in;line-height:115%;vertical-align:baseline'><span
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif;color:black'>&nbsp;</span></p>
               
               <p style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:45.0pt;
               text-align:justify;text-indent:-.5in;line-height:115%;vertical-align:baseline'><b><span
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif;color:black'>4.<span
               style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><b><span style='font-size:9.0pt;line-height:115%;font-family:
               "Times",serif;color:black'>EXPIRATION </span></b></p>
               
               <p style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:45.0pt;
               text-align:justify;line-height:115%;vertical-align:baseline'><b><span
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif;color:black'>&nbsp;</span></b></p>
               
               <p class=MsoListParagraph style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>2.8.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif;color:black'>This Agreement shall expire on the </span><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>18<sup>th</sup>
               day of May 2021</span></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoListParagraphCxSpFirst style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>LESSEE COVENANTS</span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>5.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>Reinstatement</span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'> </span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>At
               the expiration or sooner determination of the Lease created by this Agreement,
               the Lessee shall reinstate the Demised Property at its own expenses and restore
               it to the former state save for natural wear and tear, in which it was
               originally let if the Lessor so desires.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>NO WAIVER</span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>No
               demand for or acceptance of payment under this Agreement or failure by the
               Landlord or Financier to enforce any of their rights under this Agreement at
               any time or for any period shall release or exonerate or in any way affect the
               liability of the Lessee or operate as a waiver of those terms or conditions or
               the rights of the Landlord or Financier at any time afterwards to enforce each
               and every term and condition of this Agreement or any penalty attached to their
               non-performance.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>7.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 </span></span></b><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>SERVICE OF NOTICES </span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>8.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>Any notice to be given to the Landlord or Financier
               under this Agreement shall be in writing and may be served personally or by
               registered or recorded delivery mail or by electronic mail, telex or facsimile
               transmission.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>8.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>A notice shall be deemed to have been served if it
               was served in person at the service, or if it was served by post; two days
               after it was posted, and if it was served by electronic mail, telex or
               facsimile transmission; at the time of transmission.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>8.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>OPTION TO RENEW </span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpLast style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>9.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>The Landlord or Financier may at or before the end
               of the Term at the cost of the Lessee grant to the Lessee a new Lease of the Demised
               Property, if;</span></p>
               
               <p class=MsoNormal style='text-align:justify'><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoNormal style='text-align:justify'><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpFirst style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>a)         not
               less than one (1) months before the end of the Term the Lessee gives to the
               Lessor and Financier written notices that it wishes to take a new Lease of the
               Demised Property; and </span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>b)         there
               is no subsisting breach of any of the Lessee’s obligations.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>9.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>The new Agreement shall be for such further term of
               year/years as the parties may then agree, to start immediately at the
               expiration of the term herein granted, at a reviewed rent and conditions as may
               be agreed upon by the Landlord and Lessee.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>9.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>The preparation of a new Agreement and its due
               execution by the Landlord, Financier and Lessee shall be the only proof and
               evidence that the Lessee’s request to renew the Lease has been accepted by the
               Lessor and the Financier.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>9.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>DISPUTE RESOLUTION </span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>Any
               dispute arising out of or in connection with the interpretation of the
               provisions of this agreement or the performance of same shall be submitted to Mediation </ins></span>and the dispute shall be
               resolved by a sole mediator</ins></span>,
               except as otherwise agreed by the parties.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>10.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>SEVERABILITY </span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>In
               the event that any or part of these terms, conditions or provisions shall be
               determined invalid, unlawful or unenforceable to any extent, such term
               condition or provision shall be severed from the remaining terms, conditions
               and provisions which shall continue to be valid and enforceable to the fullest
               extent by law.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>11.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>GOVERNING LAW </span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>The
               terms and conditions of this Agreement shall be governed by, construed and
               interpreted in accordance with the laws of the Federal Republic of Nigeria and
               the Lagos State Government.</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>12.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>FORCE MAJEURE </span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>No
               party to this Agreement shall be liable for any failure to fulfil its
               obligations hereunder where such failure is caused by any act of nature,
               insurrection or civil disorder, war or military operations, national or local
               emergency (each an “event of force majeure”)</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify;
               text-indent:-.5in'><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>13.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </span></span></b><b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>ENTIRE AGREEMENT</span></b></p>
               
               <p class=MsoListParagraphCxSpMiddle style='margin-left:45.0pt;text-align:justify'><b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'> </span></b></p>
               
               <p class=MsoListParagraphCxSpLast style='margin-left:45.0pt;text-align:justify'><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>This
               Agreement governs the Landlord, Lessee and Financier’s relationship herein
               granted and as such cancels and supersedes any previous oral or written
               agreement.</span></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoNormal align=center style='text-align:center'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>SCHEDULE I</span></b></p>
               
               <p class=MsoNormal style='text-align:justify'><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>The Property
               is a </span></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoNormal align=center style='text-align:center'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>SCHEDULE II</span></b></p>
               
               <p class=MsoNormal style='text-align:justify'><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>Terms of
               engagement between the Landlord
               and the Lessee</span></p>
               
               <p class=MsoNormal style='text-align:justify'><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoNormal style='text-align:justify'><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoNormal style='text-align:justify'><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>IN WITNESS
               WHEREOF</span></b><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>, the parties have caused this agreement to be
               executed on the day and year first above written.</span></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>SIGNED By </span></b><b><span
               lang=EN-GB style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>the
               within-named “LESSEE” </span></b></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>………….…………………                                      
               ____________________________         </span></b></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>Name of Lessee</span>                                                                         
               </b></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>&nbsp;</span></b></p>
               
               <p class=MsoNormal style='text-align:justify'><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>For official
               use only</span></p>
               
               <p class=MsoNormal style='text-align:justify'><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>THE COMMON
               SEAL of the within named company <b>KWABA LIMITED</b> was affixed thereto:</span></p>
               
               <p class=MsoNormal style='text-align:justify'><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>In Presence
               of:</span></p>
               
               <p class=MsoNormal style='text-align:justify'><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>________________________                                                                                                     
               _____________________</span></p>
               
               <p class=MsoNormal style='text-align:justify'><b><span lang=EN-GB
               style='font-size:9.0pt;line-height:115%;font-family:"Times",serif'>Director                                                                                                                                  Director/Secretary</span></b></p>
               
               <p class=MsoNormal><span lang=EN-GB style='font-size:9.0pt;line-height:115%;
               font-family:"Times",serif'>&nbsp;</span></p>
               
               <p class=MsoNormal><span lang=EN-GB>&nbsp;</span></p>
               
               </div>
               
               </body>
               
               </html>
               `,
          }}
          // onMessage={event => {
          //     alert(event.nativeEvent.data);
          // }}

          style={{flex: 1}}
          scalesPageToFit={true}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          //   marginBottom: 19,
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          onPress={handleRejectOffer}
          style={[styles.btn, {backgroundColor: COLORS.white}]}>
          <Text style={[styles.btnText, {color: '#888'}]}>REJECT OFFER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('PostPaymentForm1');
            navigation.navigate('Signature');
          }}
          style={[styles.btn]}>
          <Text style={[styles.btnText]}>ACCEPT OFFER</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AcceptanceLetterKwaba;

const styles = StyleSheet.create({
  btn: {
    width: '48%',
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    // marginTop: 50,
  },
  btnText: {
    fontSize: 12,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

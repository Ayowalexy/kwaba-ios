import React,{useState,useEffect} from 'react';
import { View, Text,TouchableOpacity,Alert, } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import axios from 'axios';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';


const AcceptanceletterAddosser = ({navigation}) => {

    const [name, setName] = useState('');
    let username="Adebisi Joseph";
    let signature="Adebisi Joseph";
    const todaydate=moment().format('DD/MM/YYYY');
    const [eSignatureModal, setESignatureModal] = useState(false);
    const [acceptOfferResponse, setAcceptOfferResponse]=useState({});
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
    const [repayment_amount, setrepayment_amount ]= useState();
    const [repayment_start_day, setrepayment_start_day ]= useState();

   


    const getToken = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const token = JSON.parse(userData).token;
        return token;
    };
  
      
  
      const setLoanOffer=async()=>{
       
        const token = await getToken();
        const applicationIDCallRes = await axios.get('http://67.207.86.39:8000/api/v1/application/one', {
            headers: {'Content-Type': 'application/json', Authorization: token},
          });
  
  
          setApprovedAmount(applicationIDCallRes.data.data.loanable_amount);
          setMonthlyPayment(applicationIDCallRes.data.data.monthly_repayment);
          setDuration(applicationIDCallRes.data.data.repayment_plan);

          console.log(applicationIDCallRes.data.data)
  
      }  

    useEffect(() => {


        const getinitialData =async ()=> {
    
            const token = await getToken();
      
            
            try{
      
              const applicationIDCallRes = await axios.get('http://67.207.86.39:8000/api/v1/application/one', {
                  headers: {'Content-Type': 'application/json', Authorization: token},
                });
      
                console.log(applicationIDCallRes.data.data.non_refundable_deposit);
                const loanId = applicationIDCallRes.data.data.id;
                setmonthlyRepayment(Number(applicationIDCallRes.data.data.approvedrepayment))
                setrepaymentPlan(applicationIDCallRes.data.data.approved_repayment_plan);
                setapproved_amount(applicationIDCallRes.data.data.approvedamount);
                setaddress(applicationIDCallRes.data.data.home_address);
                setworkplace(applicationIDCallRes.data.data.employer_name);
            
                const res = await axios.post('http://67.207.86.39:8000/api/v1/application/dashboard', {loanId}, {
                    headers: {'Content-Type': 'application/json', Authorization: token},
                  });
               
                  
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

                  settotalrepayment(Number(repaymentPlan*monthlyRepayment));
                  
                       
          
            }
            catch(error) {
              console.log(error.response.data)
            }
         
            
          };
      
          getinitialData();




        const getUserData = async () => {
          const userData = await AsyncStorage.getItem('userData');
    
          console.log("hello here is our data ",JSON.parse(userData));
          if (userData) {
            setName(JSON.parse(userData).user.lastname+" "+JSON.parse(userData).user.firstname);
          }
        };
        getUserData();
        setLoanOffer();
      }, []);


      const handleRejectOffer=()=>{
     


        Alert.alert(
          'Offer Rejected',
          'Offer Rejected.',
        );
      } 


    return (

        <>

           <View style={{flex:1,flexDirection:'column'}}>

               <WebView
               source={{ html:`<p><strong>${todaydate}</strong></p>
               <p><strong>${name}</strong></p>
               <p><strong>${workplace}</strong></p>
               <p>${address}</p>
               <p>&nbsp;</p>
               <p>Dear Sir/ma,</p>
               <p><strong><u>RE: OFFER OF </u></strong><strong><u>N</u></strong><strong><u>${approved_amount}</u></strong><strong><u>&nbsp;CONSUMER LOAN FACILITY</u></strong></p>
               <p>Further to your application dated {applicationdate}<strong>&nbsp;</strong>we are pleased to convey to you our management&rsquo;s approval to grant your facility under the following terms and conditions:</p>
               <p>Lender: &nbsp; <strong>ADDOSSER </strong>Finance Limited &nbsp; &nbsp;</p>
               <p>Borrower: <strong> ${name}</strong></p>
               <p><strong>&nbsp;</strong></p>
               <p>Facility type: Consumer Loan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
               <p>Purpose: Personal loan</p>
               <p>Principal Amount: <strong>N${approved_amount}&nbsp;</p>
               <p>Interest rate: <strong>3.9% Flat Per Month</strong>&nbsp;&nbsp;&nbsp;</p>
               <p>Management Fee: <strong>0.5% flat of loan amount</strong></p>
               <p>Tenor: <strong>${repaymentPlan} Months</strong></p>
               <p><strong>Disbursement Date:</strong> <strong>&nbsp;${todaydate}</strong><strong>&nbsp;</strong>which could be varied subject to the fulfilment of the</p>
               <p>Conditions precedent to drawdown and the disbursement date specified in the repayment schedule which forms an integral part of this offer letter. <strong>&nbsp;&nbsp;&nbsp;&nbsp;</strong></p>
               <p><strong>Expiry Date:</strong> <strong>28/08/2021 </strong>which could also be varied as indicated above</p>
               <p><strong>Repayment date:</strong> <strong>${repayment_start_day}</strong><strong><sup>th</sup></strong><strong>&nbsp;of Every Month &nbsp;&nbsp;&nbsp;</strong><strong></strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></p>
               <p><strong>Repayment Commencement Date:</strong><strong>&nbsp;${repayment_day}</strong></p>
               <p><strong>Repayment:</strong> Monthly installment payment of <strong>N</strong><strong>${monthlyRepayment}</strong><strong>&nbsp;</strong>as evidenced by<strong>&nbsp;REMITA MANDATE</strong></p>
               <p>Credit Life Insurance Charge: <strong>1% flat of loan amount</strong></p>
               <p><strong><u>A &nbsp;&nbsp;&nbsp;CONDITIONS PRECEDENT</u></strong></p>
               <ol>
               <li>Duly Completed Application Form</li>
               <li>Executed Offer Letter.</li>
               <li>Copy of Last Three Months&rsquo; Bank statement evidencing Salary payment.</li>
               <li><strong>REMITA MANDATE</strong>in the sum of <strong>N</strong><strong>&nbsp;${totalrepayment}</strong><strong>&nbsp;</strong>representing principal plus Interest.</li>
               <li>Credit life insurance policy of <strong>1%</strong>of the sum of <strong>N100, 000.00 </strong>with Addosser Finance Limited noted as first loss beneficiary.</li>
               </ol>
               <p><strong><u>&nbsp;</u></strong></p>
               <p><strong><u>&nbsp;</u></strong></p>
               <p><strong><u>B &nbsp;&nbsp;OTHER CONDITION(s)</u></strong>&nbsp;</p>
               <ol>
               <li>Please note that, upon default, facility will attract the current interest rate of <strong>9% </strong>flat per month and default charge of 1% flat per month of the outstanding amount.</li>
               <li>5% VAT will be applicable on all fees.</li>
               <li>In addition, loan recovery expenses will be borne by the Client.</li>
               <li><strong>In the event, that two consecutive rentals remain unpaid, the lender reserves the right to call in the facility and the outstanding amount on the facility shall become payable immediately.</strong></li>
               <li><strong>Where borrower intends to pre liquidate the loan before the expiration period, the borrower is not required to pay any fees or charges. </strong></li>
               <li><strong><u> &nbsp;&nbsp;THE BORROWER COVENANTS AND WARRANTS AS FOLLOWS:</u></strong></li>
               </ol>
               <p><strong><u>&nbsp;</u></strong></p>
               <ol>
               <li>To repay the loan as and when due and further agrees that in the event of default on loan repayment, the bank shall have the right to report the delinquent loan to the CBN through the Credit Risk Management System (CRMS) or by any other means, and request the CBN to exercise its regulatory power to direct all banks and other financial institutions under its regulatory purview to set-off his/her indebtedness to the lender from any money standing to its credit in any bank account and from any other financial assets that may be holding for its benefit.</li>
               <li>That the lender shall have power to set-off his indebtedness under this loan agreement from all such monies and funds standing to his credit/benefit in any and all such accounts or from any other financial assets belonging to him and in the custody of any such bank.</li>
               <li>Not to issue cheques against unfunded account(s) as instrument of repayment. In the event any of my cheques return, the bank reserves the right to take remedial action against me for the recovery of the loan subject to Clause C6 herein.</li>
               <li>Waives any right of confidentiality whether arising under common law or statute or in any other manner whatsoever and irrevocably agrees that he shall not argue to the contrary before any court of law, tribunal, administrative authority or any other body acting in any judicial or quasi-judicial capacity.</li>
               <li>Where the borrower defaults on a credit obligation, the bank shall request the CBN to invoke the utilization of the defaulting borrower(s) deposits in other banks in repayment of the obligation.</li>
               <li>Any case of a dud or returned repayment instrument or cheque shall be reported and taken up with the authorities who shall not be limited to the EFCC where the borrower refuses to regularize his account Seven (7) Days after the cheque returns.</li>
               </ol>
               <p>Yours faithfully,</p>
               <p>For: <strong>Addosser Finance Limited</strong>&nbsp;&nbsp;&nbsp;</p>
               <p>&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;..</p>
               <p><strong>ACCOUNT OFFICER </strong> <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AUTHORISED SIGNATORY</strong></p>
               <p><strong><u>ACCEPTANCE OF OFFER BY CLIENT</u></strong></p>
               <p>All the terms and conditions have been read and understood by me, I <strong></strong><strong>${name}</strong><strong>&nbsp;</strong>hereby accept the terms and conditions as evidenced by my signature:</p>
               <p><strong>BVN:&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;..</strong></p>
               <p><strong>&nbsp;</strong></p>
               <p><strong>SIGNATURE:&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;</strong></p>
               <p><strong>&nbsp;</strong></p>
               <p><strong>DATE:&hellip;&hellip;&hellip;&hellip;</strong><strong>${todaydate}</strong><strong>&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;.</strong></p>
               <p>&nbsp;</p>
               ` }}
               // onMessage={event => {
               //     alert(event.nativeEvent.data);
               // }}
   
                style={{ flex: 1 }} scalesPageToFit={true}
               />


           </View>

           <View style={{ flexDirection: 'row', marginBottom: 19, justifyContent: 'space-around', alignItems: 'flex-end'}}>
                <TouchableOpacity
                    onPress={handleRejectOffer}
                    style={[designs.button, {backgroundColor: COLORS.white, elevation: 6, width: '43%'}]}>
                    <Text style={[designs.buttonText, {fontSize: 14, color:'#ADADAD', textAlign: 'center', fontWeight: 'normal'}]}>REJECT OFFER</Text>
                </TouchableOpacity>    
                <TouchableOpacity
                    onPress={() => {navigation.navigate('PostPaymentForm1');}}
                    style={[designs.button, {backgroundColor: COLORS.secondary, elevation: 6, width: '43%'}]}>
                    <Text style={[designs.buttonText, {fontSize: 14, color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>ACCEPT OFFER</Text>
                </TouchableOpacity>    
            
           </View>

        </>
       
    )
}

export default AcceptanceletterAddosser;

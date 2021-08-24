import React, {useCallback, useContext} from 'react';
import {
  //@ts-ignore
  Image, //@ts-ignore
  StyleSheet,
} from 'react-native';
import cardValidator from 'card-validator';
import LibraryContext from '../LibraryContext';
import {images} from '../../../util';

type Props = {
  cardNumber: string;
};

type Card = {
  icon: number;
  animation: any;
  alternativeAnimation?: any;
};

const CARDS: Record<string, Card> = {
  visa: {
    icon: images.visacardIcon,
    animation: require('./lottie/visa.json'),
  },
  mastercard: {
    icon: images.mastercardIcon,
    animation: require('./lottie/mastercard.json'),
  },
  'american-express': {
    icon: images.amexcardIcon,
    animation: require('./lottie/amex.json'),
    alternativeAnimation: require('./lottie/amexBlue.json'),
  },
  discover: {
    icon: images.discovercardIcon,
    animation: require('./lottie/discover.json'),
  },
};

const CardIcon: React.FC<Props> = (props) => {
  const {LottieView} = useContext(LibraryContext);
  const {cardNumber} = props;
  const {card} = cardValidator.number(cardNumber);

  const animRef = useCallback((node) => {
    if (node !== null) {
      node.play();
    }
  }, []);
  const data: Card = CARDS[card?.type || -1];

  if (!data) return null;

  if (!LottieView) {
    return <Image style={styles.icon} source={data.icon} />;
  }

  return (
    <LottieView
      ref={animRef}
      style={styles.lottie}
      source={data.animation}
      loop={false}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
  lottie: {
    width: 36,
    height: 36,
  },
});

export default CardIcon;

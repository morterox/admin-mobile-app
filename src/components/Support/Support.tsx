import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {BACKGROUND_COLOUR, PRIMARY_COLOR, PRIMARY_TEXT_COLOR} from '../../styles/common';
import LogoApp from '../LogoApp';
import WBanner from '../WBanner';
import SupportQuestionType from '../Inputs/SupportQuestionType';
import SupportCommentInput from '../Inputs/SupportComment';
import {AuthContext} from '../../navigation/AuthProvider';
import {ISupportRequest} from '../../services/types';
import {useToast} from 'react-native-toast-notifications';
import {apiPostSupport} from '../../services/api';

const Support = () => {
  const toast = useToast();
  const {tokenId} = useContext(AuthContext);
  const [questionType, setQuestionType] = useState<any>();
  const [questionComment, setQuestionComment] = useState(``);

  //CEA08666-4770-4790-BA64-3B6EBF701E81
  const handleSendSupportQuestion = async () => {
    const token: string = tokenId!;
    const data: ISupportRequest = {
      /// NONE OF THEM IS WORKING REALLY
      token_id: token,
      motivo_codigo: questionType.id,
      comentarios: questionComment
    };
    if (!questionComment) {
      toast.show(`No deje el texto en blanco.`, {
        type: `danger`,
        placement: `top`,
        duration: 4000,
        animationType: `slide-in`
      });
      return;
    }
    const response = await apiPostSupport(data);
    if (response.status === 200) {
      toast.show(`Su mensaje fue enviado con éxito. Gracias.`, {
        type: `success`,
        placement: `top`,
        duration: 4000,
        animationType: `slide-in`
      });
    } else {
      toast.show(`Ooops! Algo ha salido mal. Intentelo de nuevo más tarde`, {
        type: `danger`,
        placement: `top`,
        duration: 4000,
        animationType: `slide-in`
      });
    }
  };

  return (
    <View style={style.container}>
      <View style={style.logoApp}>
        <LogoApp />
      </View>
      <View style={style.banner}>
        <WBanner text={`¿Cómo te podemos ayudar?`} />
      </View>
      <View style={style.dropdown}>
        <SupportQuestionType setter={setQuestionType} />
      </View>
      <View style={style.textInput}>
        <SupportCommentInput value={questionComment} setter={setQuestionComment} />
      </View>
      <View>
        <Button
          style={style.confirmButton}
          labelStyle={style.confirmButton.text}
          mode="contained"
          onPress={handleSendSupportQuestion}
        >
          ENVIAR
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: `column`,
    paddingTop: 20,
    justifyContent: `space-evenly`,
    backgroundColor: BACKGROUND_COLOUR
  },
  logoApp: {
    alignSelf: `flex-end`,
    paddingBottom: 50
  },
  banner: {
    paddingBottom: 20
  },
  dropdown: {
    width: `80%`,
    marginLeft: `10%`
  },
  textInput: {
    width: `80%`,
    marginLeft: `10%`,
    marginTop: 30
  },
  confirmButton: {
    margin: `5%`,
    marginTop: `10%`,
    alignSelf: `center`,
    width: 220,
    backgroundColor: PRIMARY_COLOR,
    color: PRIMARY_TEXT_COLOR,
    borderRadius: 20,
    text: {
      fontSize: 24
    }
  }
});

export default Support;

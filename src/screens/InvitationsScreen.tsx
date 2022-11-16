import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {
  BACKGROUND_COLOUR,
  BLACK_COLOR,
  GREY_COLOR,
  LIGHT_GREY_COLOR,
  PRIMARY_COLOR,
  PRIMARY_TEXT_COLOR,
  SECONDARY_COLOR,
  THIRD_COLOR,
  WHITE_COLOR
} from '../styles/common';
import CreateInvitation from './CreateInvitation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useEffect} from 'react';
import {authorizeInvitation, deleteInvitation, getInvitationsOfUser} from '../services/api';
import {AuthContext} from '../navigation/AuthProvider';
import {useToast} from 'react-native-toast-notifications';

const months = [`ENE`, `FEB`, `MAR`, `ABR`, `MAY`, `JUN`, `JUL`, `AGS`, `SET`, `OCT`, `NOV`, `DEC`];

export default function Invitations() {
  const {tokenId} = useContext(AuthContext);
  const [tab, setTab] = useState(`creational`);
  const [showTab, setShowTab] = useState(true);

  return (
    <View style={style.container}>
      {showTab && (
        <View style={style.tabs}>
          <Text
            onPress={() => {
              setTab(`creational`);
            }}
            style={tab == `creational` ? style.buttonTabSelected : style.buttonTab}
          >
            Crear Invitaciones
          </Text>
          <Text style={style.buttonTab}>|</Text>
          <Text
            onPress={() => {
              setTab(`invitations`);
            }}
            style={tab == `invitations` ? style.buttonTabSelected : style.buttonTab}
          >
            Invitaciones
          </Text>
        </View>
      )}
      {tab == `creational` && <CreateInvitationTab setTab={setTab} setShowTab={setShowTab} />}
      {tab == `invitations` && <InvitationsTab setTab={setTab} setShowTab={setShowTab} />}
    </View>
  );
}

function CreateInvitationTab({setShowTab, setTab}) {
  const [isCreating, setIsCreating] = useState(false);
  const [invitationsAmount, setInvitationsAmount] = useState(2);

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        {!isCreating && (
          <View style={style.createInvitationTab}>
            <Text style={style.textInvitation}>Si queres agregar una invitación hacé click en el siguiente botón</Text>
            <View
              onTouchStart={() => {
                setShowTab(false);
                setIsCreating(!isCreating);
              }}
              style={style.button}
            >
              <Text style={style.buttonText}>{`Agregar`}</Text>
            </View>
          </View>
        )}
        {isCreating && <CreateInvitation setShowTab={setShowTab} setIsCreating={setIsCreating} setTab={setTab} />}
      </ScrollView>
    </SafeAreaView>
  );
}

function InvitationsTab({setShowTab, setTab}) {
  const [invitationsData, setInvitationsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [popupDelete, setPopupDelete] = useState(false);
  const [popupAuthorize, setPopupAuthorize] = useState(false);
  const [edit, setEdit] = useState(false);
  const {tokenId} = useContext(AuthContext);

  useEffect(() => {
    getInvitationsOfUser(tokenId).then((result) => {
      setInvitationsData(
        result.map((invitation) => {
          return {
            id: invitation.invitacion_nro,
            from: new Date(invitation.fecha_efectiva),
            to: new Date(invitation.fecha_efectiva_hasta),
            created: new Date(invitation.fecha_pedido),
            authorized: invitation.invitacion_autorizada == `SI` ? true : false
          };
        })
      );
    });
  }, []);

  console.log(currentIndex, `CCURRENT INDEX ACAA`);

  if (currentIndex >= 0) {
    setShowTab(false);
  } else {
    setShowTab(true);
  }

  return (
    <View
      style={{
        display: `flex`,
        margin: `5%`,
        width: `90%`,
        maxHeight: `100%`
      }}
    >
      {currentIndex == -1 &&
        invitationsData.map((invitation, index) => {
          return (
            <Invitation
              setCurrentIndex={setCurrentIndex}
              invitationsData={invitationsData}
              setInvitationsData={setInvitationsData}
              index={index}
              setPopupDelete={setPopupDelete}
              setPopupAuthorize={setPopupAuthorize}
              setEdit={setEdit}
            />
          );
        })}
      <View>
        {edit && currentIndex >= 0 && (
          <SafeAreaView style={style.container}>
            <ScrollView>
              <CreateInvitation
                setEdit={setEdit}
                setCurrentInvitationIdIndex={setCurrentIndex}
                invitationId={invitationsData[currentIndex].id}
                setCurrentInvitationIndex={setCurrentIndex}
                setIsCreating={() => {}}
                setTab={setTab}
              />
            </ScrollView>
          </SafeAreaView>
        )}

        {popupDelete && (
          <PopUp
            Element={() => {
              return (
                <DeleteInvitationPopup
                  index={currentIndex}
                  setPopup={setPopupDelete}
                  setInvitationsData={setInvitationsData}
                  invitationsData={invitationsData}
                  setCurrentIndex={setCurrentIndex}
                />
              );
            }}
          />
        )}

        {popupAuthorize && (
          <PopUp
            Element={() => {
              return (
                <AuthorizeInvitationPopup
                  index={currentIndex}
                  setPopup={setPopupAuthorize}
                  setInvitationsData={setInvitationsData}
                  invitationsData={invitationsData}
                  setCurrentIndex={setCurrentIndex}
                />
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

function Invitation({
  invitationsData,
  setInvitationsData,
  index,
  setCurrentIndex,
  setPopupDelete,
  setPopupAuthorize,
  setEdit
}) {
  const currentData = invitationsData[index];
  const {permisos} = useContext(AuthContext);

  return (
    <View
      style={{
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: `transparent`,
        backgroundColor: LIGHT_GREY_COLOR,
        display: `flex`,
        flexDirection: `row`,
        height: 100,
        justifyContent: `space-between`,
        zIndex: 1,
        elevation: 1,
        position: `relative`
      }}
    >
      <View
        style={{
          width: `30%`,
          height: `100%`,
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        <View
          style={{
            width: `100%`,
            display: `flex`,
            flexDirection: `column`,
            height: `100%`,
            alignItems: `center`,
            justifyContent: `space-around`,
            borderRightColor: `red`,
            borderRightWidth: 1,
            padding: 10
          }}
        >
          <Text style={{fontSize: 20}}>{currentData.from.getDate()}</Text>
          <Text style={{fontSize: 20}}>{months[currentData.from.getMonth()]}</Text>
          <Text style={{fontSize: 20}}>{currentData.from.getFullYear()}</Text>
        </View>
      </View>
      <View
        style={{
          display: `flex`,
          flexDirection: `column`,
          height: `100%`,
          alignItems: `center`,
          justifyContent: `space-around`
        }}
      >
        <Text style={{fontSize: 15}}>Numero de invitacion</Text>
        <Text style={{fontSize: 15}}>{currentData.id}</Text>
        <Text style={{fontSize: 15}}>Autorizado: {invitationsData[index].authorized ? `si` : `no`}</Text>
      </View>
      <View
        style={{
          display: `flex`,
          flexDirection: `column`,
          height: `100%`,
          alignItems: `center`,
          justifyContent: `space-around`
        }}
      >
        <Text
          onPress={() => {
            setCurrentIndex(index);
            setEdit(true);
          }}
        >
          <FontAwesome name={`edit`} color={`#444`} size={30} />
        </Text>
        {permisos[`INVITADOS`] && permisos[`INVITADOS`][`MODIFICAR`] && (
          <Text
            onPress={() => {
              setCurrentIndex(index);
              setEdit(false);
              setPopupDelete(true);
            }}
          >
            <FontAwesome name={`trash`} color={`#444`} size={30} />
          </Text>
        )}
        {permisos[`INVITADOS`] && permisos[`INVITADOS`][`AUTORIZAR`] && (
          <Text
            onPress={() => {
              setCurrentIndex(index);
              setEdit(false);
              setPopupAuthorize(true);
            }}
          >
            <FontAwesome name={`check`} color={`#444`} size={30} />
          </Text>
        )}
      </View>
    </View>
  );
}

function DeleteInvitationPopup({setPopup, setInvitationsData, invitationsData, index, setCurrentIndex}) {
  const toast = useToast();
  const {tokenId} = useContext(AuthContext);
  return (
    <View>
      <Text style={{fontSize: 20, color: `red`, marginLeft: `5%`}}>Está seguro que desea borrar la invitacion?</Text>
      <View style={{display: `flex`, flexDirection: `row`, justifyContent: `space-around`}}>
        <View style={{...style.button, width: `40%`}}>
          <Text
            onPress={() => {
              deleteInvitation(invitationsData[index].id, tokenId).then((result) => {
                if (result.status == 200) {
                  toast.show(`La invitacion fue borrada con éxito. Gracias.`, {
                    type: `success`,
                    placement: `top`,
                    duration: 4000,
                    animationType: `slide-in`
                  });
                  const invitationsCopy = [].concat(invitationsData);
                  invitationsCopy.splice(index, 1);
                  setInvitationsData(invitationsCopy);
                  setPopup(false);
                  setCurrentIndex(-1);
                } else {
                  toast.show(`Ooops! Algo ha salido mal. Intentelo de nuevo más tarde`, {
                    type: `danger`,
                    placement: `top`,
                    duration: 4000,
                    animationType: `slide-in`
                  });
                }
              });
            }}
            style={{
              fontWeight: `400`,
              color: `white`,
              fontSize: 22,
              textAlign: `center`
            }}
          >
            Aceptar
          </Text>
        </View>
        <View style={{...style.button, width: `40%`}}>
          <Text
            onPress={() => {
              setPopup(false);
              setCurrentIndex(-1);
            }}
            style={{
              fontWeight: `400`,
              color: `white`,
              fontSize: 22,
              textAlign: `center`
            }}
          >
            Cancelar
          </Text>
        </View>
      </View>
    </View>
  );
}

function AuthorizeInvitationPopup({setPopup, setInvitationsData, invitationsData, index, setCurrentIndex}) {
  const toast = useToast();
  const {tokenId} = useContext(AuthContext);
  return (
    <View>
      <Text style={{fontSize: 20, color: `red`, marginLeft: `5%`}}>
        Está seguro que desea {invitationsData[index].authorized ? `des` : ``}autorizar la invitacion?
      </Text>
      <View style={{display: `flex`, flexDirection: `row`, justifyContent: `space-around`}}>
        <View style={{...style.button, width: `40%`}}>
          <Text
            onPress={() => {
              authorizeInvitation(invitationsData[index].id, invitationsData[index].authorized, tokenId).then(
                (result) => {
                  if (result.status == 200) {
                    toast.show(
                      `La invitacion fue ${
                        invitationsData[index].authorized ? `des` : ``
                      }autorizada con éxito. Gracias.`,
                      {
                        type: `success`,
                        placement: `top`,
                        duration: 4000,
                        animationType: `slide-in`
                      }
                    );
                    const invitationsCopy = [].concat(invitationsData);
                    invitationsCopy[index].authorized = invitationsCopy[index].authorized ? false : true;
                    setInvitationsData(invitationsCopy);
                    setPopup(false);
                    setCurrentIndex(-1);
                  } else {
                    toast.show(`Ooops! Algo ha salido mal. Intentelo de nuevo más tarde`, {
                      type: `danger`,
                      placement: `top`,
                      duration: 4000,
                      animationType: `slide-in`
                    });
                  }
                }
              );
            }}
            style={{
              fontWeight: `400`,
              color: `white`,
              fontSize: 22,
              textAlign: `center`
            }}
          >
            Aceptar
          </Text>
        </View>
        <View style={{...style.button, width: `40%`}}>
          <Text
            onPress={() => {
              setPopup(false);
              setCurrentIndex(-1);
            }}
            style={{
              fontWeight: `400`,
              color: `white`,
              fontSize: 22,
              textAlign: `center`
            }}
          >
            Cancelar
          </Text>
        </View>
      </View>
    </View>
  );
}

function PopUp({Element}) {
  return (
    <View
      style={{
        width: `90%`,
        marginLeft: `5%`,
        backgroundColor: BACKGROUND_COLOUR,
        borderColor: `black`,
        borderWidth: 1,
        borderRadius: 10,
        height: 250,
        position: `absolute`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `space-around`,
        marginTop: 0,
        zIndex: 2,
        elevation: 2
      }}
    >
      <Element />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: `flex`,
    flexDirection: `column`,
    height: `100%`
  },
  title: {
    alignSelf: `flex-start`,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 10,
    text: {
      color: SECONDARY_COLOR,
      fontSize: 26
    }
  },
  tabs: {
    display: `flex`,
    borderBottomWidth: 1,
    borderBottomColor: `black`,
    flexDirection: `row`,
    justifyContent: `space-between`,
    width: `80%`,
    marginLeft: `10%`
  },
  buttonTab: {
    fontSize: 20,
    padding: 5,
    cursor: `pointer`,
    color: GREY_COLOR
  },
  buttonTabSelected: {
    fontSize: 20,
    padding: 5,
    cursor: `pointer`,
    color: PRIMARY_COLOR
  },
  button: {
    marginTop: 40,
    backgroundColor: PRIMARY_COLOR,
    color: PRIMARY_TEXT_COLOR,
    borderRadius: 10,
    padding: 10,
    width: `60%`
  },
  miniButton: {
    marginTop: 40,
    backgroundColor: PRIMARY_COLOR,
    color: PRIMARY_TEXT_COLOR,
    borderRadius: 10,
    padding: 10
  },
  buttonText: {
    color: `white`,
    fontSize: 22,
    textAlign: `center`
  },
  createInvitationTab: {
    backgroundColor: THIRD_COLOR,
    borderRadius: 10,
    marginTop: 40,
    width: `80%`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    marginLeft: `10%`,
    borderColor: `grey`,
    borderWidth: 1,
    padding: 20
  },
  textInvitation: {
    fontSize: 20,
    color: BLACK_COLOR
  }
});

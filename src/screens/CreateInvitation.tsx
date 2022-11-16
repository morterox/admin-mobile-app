import React, {useContext, useEffect, useState} from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import {IPasswordReset} from '../services/types';
import IdentificationTypeInput from '../components/Inputs/IdentificationType';
import EmailInput from '../components/Inputs/Email';
import IdentificationInput from '../components/Inputs/Identification';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  BACKGROUND_COLOUR,
  LIGHT_GREY_COLOR,
  PRIMARY_COLOR,
  PRIMARY_TEXT_COLOR,
  RED_COLOR,
  SECONDARY_COLOR,
  THIRD_COLOR
} from '../styles/common';
import InvitatonRelationTypeInput from '../components/Inputs/InvitatonRelationTypeInput';
import InvitationType from '../components/Inputs/InvitationType';
import CellphoneInput from '../components/Inputs/Cellphone';
import LicensePlateInput from '../components/Inputs/LicensePlate';
import FullNameInput from '../components/Inputs/Fullname';
import DateInput from '../components/Inputs/Date';
import PermissionInput from '../components/Inputs/PermissionInput';
import WButton from '../components/WButton';
import {useToast} from 'react-native-toast-notifications';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {deleteGuestId, getCurrentMonthAmount, getInvitationData, postInvitation, putInvitation} from '../services/api';
import {AuthContext} from '../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const checkIsEmail = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(email);
};
const RECORDATORIO_KEY = `csha-recordatorio-key-pressed`;

export default function CreateInvitation({
  setCurrentInvitationIdIndex,
  setEdit,
  setShowTab,
  setTab,
  setIsCreating,
  invitationId,
  setCurrentInvitationIndex
}) {
  const {tokenId, permisos} = useContext(AuthContext);
  const toast = useToast();
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const [invitationsData, setInvitationsData] = useState([{}]);
  const [currentIndex, setCurrentIndex] = useState(`datesView`);
  const [deletedInvitations, setDeletedInvitations] = useState([]);

  const [invitationType, setInvitationType] = useState(``);
  const [page, setPage] = useState(`datesView`);
  const [popup, setPopup] = useState(false);
  const [showReminder, setShowReminder] = useState(true);
  const [showReminderMemory, setShowReminderMemory] = useState(false);

  const [deleteInvitationPopup, setDeleteInvitationPopup] = useState(false);

  const [deletionIndex, setDeletionIndex] = useState(-1);

  async function readValue() {
    const v = await AsyncStorage.getItem(RECORDATORIO_KEY);
    setShowReminder(v == `true` ? false : true);
  }

  useEffect(() => {
    readValue();
    if (invitationId) {
      getInvitationData(invitationId, tokenId).then((result) => {
        if (result.status == 200) {
          let invitationType = ``;
          console.log(result.data.invitados.length, `AQUIII`);
          setInvitationsData(
            result.data.invitados.map((invitado) => {
              invitationType = invitado.tipo_invitado_cod;
              return {
                name: invitado.invitado_nombre,
                surname: invitado.invitado_apellido,
                identificationType: invitado.documento_tipo_cod,
                identification: invitado.documento_nro,
                invitationRelationType: invitado.tipo_vinculo_id,
                email: invitado.email,
                cellphone: invitado.tel_celular,
                licensePlate: invitado.patente,
                canJoinWithoutAssociated: invitado.flag_ingreso_en_aus == `S` ? true : false,
                takesKey: invitado.flag_retira_llave == `S` ? true : false,
                invitationId: invitado.invitacion_id,
                guestId: invitado.invitado_id
              };
            })
          );
          setFrom(new Date(result.data.fecha_efectiva));
          setTo(new Date(result.data.fecha_efectiva_hasta));
          setInvitationType(invitationType);
        }
      });
    }
  }, []);

  console.log(invitationsData, `INVITATIONSDATA`);

  const editInvitation = async () => {
    if (!permisos[`INVITADOS`] || !permisos[`INVITADOS`][`MODIFICAR`]) {
      toast.show(`No tienes permisos para modificar la invitacion`, {
        type: `danger`,
        placement: `top`,
        duration: 4000,
        animationType: `slide-in`
      });
      return;
    }
    const payload = {
      invitacion_nro: invitationId,
      fecha_efectiva: new Date(from.toLocaleDateString()),
      fecha_efectiva_hasta: new Date(to.toLocaleDateString()),
      fecha_pedido: new Date(),
      invitacion_autorizada: `N`,
      invitados: invitationsData.map((invitationData) => {
        return {
          invitacion_id: invitationData.invitationId,
          invitado_id: invitationData.guestId,
          invitado_nombre: invitationData.name,
          invitado_apellido: invitationData.surname,
          documento_tipo_cod: invitationData.identificationType,
          documento_nro: invitationData.identification,
          tipo_vinculo_id: invitationData.invitationRelationType,
          tipo_invitado_cod: invitationType,
          email: invitationData.email,
          tel_celular: invitationData.cellphone,
          patente: invitationData.licensePlate,
          flag_ingreso_en_aus: invitationData.canJoinWithoutAssociated ? `S` : `N`,
          flag_retira_llave: invitationData.takesKey ? `S` : `N`,
          invitacion_autorizada: `N`
        };
      })
    };
    const response = await putInvitation(payload, tokenId);
    if (response.status === 200) {
      toast.show(`La invitacion fue editada con éxito. Gracias.`, {
        type: `success`,
        placement: `top`,
        duration: 4000,
        animationType: `slide-in`
      });
      setPage(`datesView`);
      setTab(`invitations`);
      setCurrentInvitationIdIndex(-1);
      setEdit(false);
      for (const deletedInvitationId of deletedInvitations) {
        await deleteGuestId(deletedInvitationId, tokenId);
      }
    } else {
      toast.show(`Ooops! Algo ha salido mal. Intentelo de nuevo más tarde`, {
        type: `danger`,
        placement: `top`,
        duration: 4000,
        animationType: `slide-in`
      });
    }
  };

  const createInvitation = async () => {
    const payload = {
      invitacion_nro: `string`,
      fecha_efectiva: new Date(from.toLocaleDateString()),
      fecha_efectiva_hasta: new Date(to.toLocaleDateString()),
      fecha_pedido: new Date(),
      invitacion_autorizada: `N`,
      invitados: invitationsData.map((invitationData) => {
        console.log(invitationData, `INVITATION DATA`);
        return {
          invitacion_id: 0,
          invitado_id: 0,
          invitado_nombre: invitationData.name,
          invitado_apellido: invitationData.surname,
          documento_tipo_cod: invitationData.identificationType,
          documento_nro: invitationData.identification,
          tipo_vinculo_id: invitationData.invitationRelationType.id,
          tipo_invitado_cod: invitationType.id,
          email: invitationData.email,
          tel_celular: invitationData.cellphone,
          patente: invitationData.licensePlate,
          flag_ingreso_en_aus: invitationData.canJoinWithoutAssociated ? `S` : `N`,
          flag_retira_llave: invitationData.takesKey ? `S` : `N`,
          invitacion_autorizada: `N`
        };
      })
    };
    const response = await postInvitation(payload, tokenId);
    if (response.status === 200 && !response.data.status) {
      toast.show(`La invitacion fue creada con éxito. Gracias.`, {
        type: `success`,
        placement: `top`,
        duration: 4000,
        animationType: `slide-in`
      });
      setPage(`datesView`);
      setTab(`invitations`);
    } else {
      toast.show(response.data?.mensaje || `Ooops! Algo ha salido mal. Intentelo de nuevo más tarde`, {
        type: `danger`,
        placement: `top`,
        duration: 4000,
        animationType: `slide-in`
      });
    }
  };

  return (
    <View style={{height: `100%`}}>
      {page == `invitationForm` && (
        <InvitationFormData
          setPage={setPage}
          index={currentIndex}
          setInvitationsData={setInvitationsData}
          invitationsData={invitationsData}
        />
      )}
      {page == `datesView` && (
        <View style={style.firstViewContainer}>
          {invitationId && <Text>ID de invitacion: {invitationId}</Text>}
          <Text
            style={{backgroundColor: `transparent`, padding: 5, color: `red`}}
            onPress={() => {
              if (invitationId) {
                setCurrentInvitationIndex(-1);
              } else {
                setIsCreating(false);
                setShowTab(true);
              }
            }}
          >
            Volver
          </Text>
          <View style={{width: `80%`, marginLeft: `10%`}}>
            <Text style={style.dateLabel}>Tipo de invitado</Text>
            <InvitationType value={invitationType} setter={setInvitationType} />
          </View>

          <View style={style.dateGroup}>
            <Text style={style.dateLabel}>Fecha de invitacion</Text>

            <View style={style.dateInputs}>
              <DateInput text={`Desde`} value={from} setter={setFrom} />
              <DateInput text={`Hasta`} value={to} setter={setTo} />
            </View>
          </View>

          <View style={{...style.container}}>
            {(() => {
              const elements = [];
              for (let i = 0; i < invitationsData.length; i++) {
                elements.push(
                  <CompletedView
                    setDeleteInvitationPopup={setDeleteInvitationPopup}
                    setDeletedInvitations={setDeletedInvitations}
                    deletedInvitations={deletedInvitations}
                    setCurrentIndex={setCurrentIndex}
                    setPage={setPage}
                    setInvitationsData={setInvitationsData}
                    invitationsData={invitationsData}
                    index={i}
                    key={i}
                    setDeletionIndex={setDeletionIndex}
                  />
                );
              }
              return elements;
            })()}
            {deleteInvitationPopup && (
              <PopUp
                Element={() => {
                  return (
                    <DeleteInvitationPopup
                      setDeletedInvitations={setDeletedInvitations}
                      deletedInvitations={deletedInvitations}
                      currentData={invitationsData[deletionIndex]}
                      setDeletionIndex={setDeletionIndex}
                      setPopup={setDeleteInvitationPopup}
                      setInvitationsData={setInvitationsData}
                      invitationsData={invitationsData}
                      index={deletionIndex}
                    />
                  );
                }}
              />
            )}
            <View style={{...style.button, marginTop: 150}}>
              <Text
                onPress={() => {
                  if (showReminder) {
                    setPopup(true);
                  }
                  const invitationsCopy = [].concat(invitationsData);
                  invitationsCopy.push({});
                  setInvitationsData(invitationsCopy);
                }}
                style={style.text}
              >
                Agregar invitado
              </Text>
            </View>
            <View style={{...style.button, marginTop: 10}}>
              <Text onPress={invitationId ? editInvitation : createInvitation} style={style.text}>
                Enviar
              </Text>
            </View>
          </View>

          {popup && showReminder && (
            <Reminder
              setPopup={setPopup}
              setShowReminder={setShowReminder}
              showReminderMemory={showReminderMemory}
              setShowReminderMemory={setShowReminderMemory}
            />
          )}
        </View>
      )}
    </View>
  );
}

function Reminder({setPopup, setShowReminder, showReminderMemory, setShowReminderMemory}) {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    getCurrentMonthAmount().then((result) => {
      setAmount(result);
    });
  }, []);

  async function saveValue(value: string) {
    await AsyncStorage.setItem(RECORDATORIO_KEY, value);
  }

  return (
    <View
      style={{
        width: `80%`,
        marginLeft: `10%`,
        backgroundColor: BACKGROUND_COLOUR,
        borderColor: `black`,
        borderWidth: 1,
        borderRadius: 10,
        height: 250,
        position: `absolute`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `space-around`,
        marginTop: 340
      }}
    >
      <Text style={{fontSize: 20, color: `red`, marginLeft: `5%`}}>Recordatorio</Text>
      <Text style={{marginLeft: `5%`}}>
        Recorda que podes invitar <Text style={{fontWeight: `bold`}}>{amount}</Text> cantidad de veces por mes a un
        invitado
      </Text>

      <View style={{display: `flex`, flexDirection: `row`, width: `100%`, justifyContent: `space-around`}}>
        <PermissionInput value={showReminderMemory} setter={setShowReminderMemory} text="No mostrar más" />
        <View style={style.button}>
          <Text
            onPress={() => {
              saveValue(`true`);
              setPopup(false);
              setShowReminder(!showReminderMemory);
            }}
            style={style.text}
          >
            Aceptar
          </Text>
        </View>
      </View>
    </View>
  );
}

function InvitationFormData({setPage, index, setInvitationsData, invitationsData}) {
  const data = invitationsData[index];
  const toast = useToast();
  const [email, setEmail] = useState(data.email || ``);
  const [identification, setIdentification] = useState(data.identification || ``);
  const [identificationType, setIdentificationType] = useState(data.identificationType || ``);
  const [name, setName] = useState(data.name || ``);
  const [surname, setSurname] = useState(data.surname || ``);
  const [invitationRelationType, setInvitationRelationType] = useState(data.invitationRelationType || ``);
  const [cellphone, setCellphone] = useState(data.cellphone || ``);
  const [licensePlate, setLicensePlate] = useState(data.licensePlate || ``);
  const [canJoinWithoutAssociated, setCanJoinWithoutAssociated] = useState(data.canJoinWithoutAssociated || ``);
  const [takesKey, setTakesKey] = useState(data.takesKey || ``);

  return (
    <View style={style.container}>
      <View
        style={{
          display: `flex`,
          flexDirection: `row`,
          width: `100%`,
          justifyContent: `space-between`
        }}
      >
        <Text
          style={{backgroundColor: `transparent`, padding: 5, color: `red`}}
          onPress={() => {
            setPage(`datesView`);
          }}
        >
          Volver
        </Text>
      </View>
      <Text style={style.inputLabel}>Datos del invitado</Text>
      <View style={style.inputGroup}>
        <IdentificationTypeInput value={identificationType} setter={setIdentificationType} />
        <IdentificationInput value={identification} setter={setIdentification} />
        <FullNameInput mandatory label="Nombre" setter={setName} value={name} />
        <FullNameInput mandatory label="Apellido" setter={setSurname} value={surname} />
        <InvitatonRelationTypeInput mandatory value={invitationRelationType} setter={setInvitationRelationType} />
      </View>
      <Text style={style.inputLabel}>Datos de contacto</Text>
      <View style={style.inputGroup}>
        <CellphoneInput mandatory setter={setCellphone} value={cellphone} />
        <EmailInput mandatory value={email} setter={setEmail} />
      </View>
      <Text style={style.inputLabel}>Datos del vehículo</Text>
      <View style={style.inputGroup}>
        <LicensePlateInput value={licensePlate} setter={setLicensePlate} />
      </View>
      <Text style={style.inputLabel}>Permisos</Text>
      <View style={style.inputGroup}>
        <PermissionInput
          width={`100%`}
          textLeft
          value={canJoinWithoutAssociated}
          setter={setCanJoinWithoutAssociated}
          text="Puede entrar sin el socio"
        />
      </View>
      <View style={{...style.button, width: `50%`, marginTop: 5, marginLeft: `25%`}}>
        <Text
          onPress={() => {
            if (!checkIsEmail(email)) {
              toast.show(`Error. El formato del email es invalido.`, {
                type: `danger`,
                placement: `top`,
                duration: 6000,
                animationType: `slide-in`
              });
              return;
            }
            setPage(`datesView`);
            const invitationsCopy = [].concat(invitationsData);
            invitationsCopy[index] = {
              ...data,
              email,
              identification,
              identificationType,
              name,
              surname,
              invitationRelationType,
              cellphone,
              licensePlate,
              canJoinWithoutAssociated,
              takesKey
            };
            setInvitationsData(invitationsCopy);
          }}
          style={style.text}
        >
          Confirmar
        </Text>
      </View>
    </View>
  );
}

function CompletedView({
  setDeletedInvitations,
  deletedInvitations,
  index,
  setInvitationsData,
  invitationsData,
  setPage,
  setCurrentIndex,
  setDeleteInvitationPopup,
  setDeletionIndex
}) {
  const currentData = invitationsData[index];

  return (
    <View
      style={{
        display: `flex`,
        flexDirection: `row`,
        alignItems: `center`,
        width: `100%`,
        borderRadius: 10,
        backgroundColor: LIGHT_GREY_COLOR,
        padding: 10,
        marginTop: 15,
        justifyContent: `space-between`
      }}
    >
      <View>
        <Text style={{fontSize: 20}}>
          {currentData?.name || currentData?.surname ? `${currentData?.name} ${currentData?.surname}` : `COMPLETAR`}
        </Text>
        <Text style={{fontSize: 20}}>{`Invitado ${index + 1}`}</Text>
      </View>
      <View style={{display: `flex`, flexDirection: `row`, width: 60, justifyContent: `space-between`}}>
        <Text
          onPress={() => {
            setDeleteInvitationPopup(true);
            setDeletionIndex(index);
          }}
        >
          <FontAwesome
            name={`trash`}
            color={deletedInvitations.indexOf(currentData.guestId) >= 0 ? `red` : `#444`}
            size={20}
          />
        </Text>
        <Text
          onPress={() => {
            setPage(`invitationForm`);
            setCurrentIndex(index);
          }}
        >
          <FontAwesome name={`edit`} color={`#444`} size={20} />
        </Text>
      </View>
    </View>
  );
}

function DeleteInvitationPopup({
  setPopup,
  setInvitationsData,
  invitationsData,
  index,
  currentData,
  deletedInvitations,
  setDeletedInvitations,
  setDeletionIndex
}) {
  const toast = useToast();
  const {tokenId} = useContext(AuthContext);
  return (
    <View>
      <Text style={{fontSize: 20, color: `red`, marginLeft: `5%`}}>Está seguro que desea borrar la invitacion?</Text>
      <View style={{display: `flex`, flexDirection: `row`, justifyContent: `space-around`}}>
        <View style={{...style.button, width: `40%`}}>
          <Text
            onPress={() => {
              if (!currentData.guestId) {
                const invitationsDataCopy = [].concat(invitationsData);
                invitationsDataCopy.splice(index, 1);
                setInvitationsData(invitationsDataCopy);
                // TODO: fix delete last
              } else {
                const arrayDeletedGuests = [].concat(deletedInvitations);
                const deletedGuestIndex = deletedInvitations.indexOf(currentData.guestId);
                if (deletedGuestIndex >= 0) {
                  arrayDeletedGuests.splice(deletedGuestIndex, 1);
                } else {
                  arrayDeletedGuests.push(currentData.guestId);
                }
                setDeletedInvitations(arrayDeletedGuests);
              }
              setPopup(false);
              setDeletionIndex(-1);
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

export function PopUp({Element}) {
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
  firstViewContainer: {
    height: `100%`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-around`
  },
  container: {
    display: `flex`,
    margin: `5%`,
    width: `90%`
  },
  loginScreenButton: {
    margin: `5%`,
    width: `90%`,
    color: PRIMARY_TEXT_COLOR,
    backgroundColor: PRIMARY_COLOR
  },
  forgotScreenButton: {
    margin: `5%`,
    width: `90%`,
    color: PRIMARY_TEXT_COLOR,
    backgroundColor: PRIMARY_COLOR
  },
  inputGroup: {
    width: `100%`,
    backgroundColor: THIRD_COLOR,
    padding: 10
  },
  dateGroup: {
    display: `flex`,
    flexDirection: `column`,
    width: `80%`,
    marginLeft: `10%`,
    textAlign: `center`
  },
  dateInputs: {
    display: `flex`,
    flexDirection: `row`,
    width: `100%`,
    justifyContent: `space-around`,
    backgroundColor: `#d3d3d3`,
    paddingTop: 5,
    paddingBottom: 15,
    borderRadius: 10
  },
  dateLabel: {
    fontSize: 20,
    paddingBottom: 15
  },
  inputLabel: {
    fontSize: 20
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    color: PRIMARY_TEXT_COLOR,
    borderRadius: 10,
    height: 40,
    padding: 5
  },
  text: {
    fontWeight: `400`,
    color: `white`,
    fontSize: 22,
    textAlign: `center`
  }
});

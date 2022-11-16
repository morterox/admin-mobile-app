import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Linking, ScrollView} from 'react-native';
import HomeInfo from '../components/Home/HomeInfo';
import {PRIMARY_COLOR, PRIMARY_TEXT_COLOR, SECONDARY_COLOR} from '../styles/common';
import {useNavigation} from '@react-navigation/native';
import HomeCarousel from '../components/Home/HomeCarousel';
import {useToast} from 'react-native-toast-notifications';
import {crearCancha, deleteCancha, editarCancha, getCanchas, getCanchaById} from '../services/api';
import {AuthContext} from '../navigation/AuthProvider';
import HourInput from '../components/Inputs/Hour';
import PermissionInput from '../components/Inputs/PermissionInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PopUp} from './CreateInvitation';
import FullNameInput from '../components/Inputs/Fullname';

export default function Canchas({}) {
  const [tab, setTab] = useState(`home`);
  const [canchaCurrentId, setCanchaCurrentId] = useState();

  return (
    <View style={homeStyle.container}>
      {tab == `home` && <MainCanchas setCanchaCurrentId={setCanchaCurrentId} setTab={setTab} />}
      {tab == `creational` && <CreateCancha setTab={setTab} />}
      {tab == `edit` && (
        <CreateCancha setCanchaCurrentId={setCanchaCurrentId} canchaCurrentId={canchaCurrentId} setTab={setTab} />
      )}
    </View>
  );
}

function CatalogoItem({setObj, obj, data, amount}) {
  return (
    <View
      style={{
        width: `100%`,
        marginTop: 15,
        flexDirection: `row`,
        display: `flex`,
        justifyContent: `space-between`,
        borderRadius: 15,
        borderWidth: 1,
        padding: 15,
        borderColor: `grey`
      }}
    >
      <View style={{display: `flex`, flexDirection: `column`, alignItems: `center`}}>
        <Image
          style={{width: 100, height: 100}}
          source={{
            uri: data.image
          }}
        />
        <Text>{data.name}</Text>
      </View>
      <View style={{display: `flex`, flexDirection: `column`, justifyContent: `space-around`}}>
        <Text
          onPress={() => {
            const objCopy = {...obj};
            if (!objCopy[data.name]) {
              objCopy[data.name] = 1;
            } else {
              objCopy[data.name] = objCopy[data.name] + 1;
            }
            setObj(objCopy);
          }}
        >
          <FontAwesome name={`plus`} color={`#444`} size={18} />
        </Text>
        <Text>{amount}</Text>
        <Text
          onPress={() => {
            const objCopy = {...obj};
            if (objCopy[data.name]) {
              objCopy[data.name]--;
            }
            setObj(objCopy);
          }}
        >
          <FontAwesome name={`minus`} color={`#444`} size={18} />
        </Text>
      </View>
    </View>
  );
}

function CreateCancha({setTab, setCanchaCurrentId, canchaCurrentId}) {
  const [hour, setHour] = useState(new Date());
  const [llevaEquipo, setLlevarEquipo] = useState(true);
  const [canchaDeTenis, setCanchaDeTenis] = useState(false);
  const [canchaDeFutbol, setCanchaDeFutbol] = useState(false);
  const [canchaDePadel, setCanchaDePadel] = useState(false);

  useEffect(() => {
    if (canchaCurrentId != null && canchaCurrentId != undefined) {
      getCanchaById(canchaCurrentId).then((result) => {
        if (result.status == 200 && result.data) {
          setHour(new Date(result.data.entity.hour));
          setLlevarEquipo(result.data.entity.llevaEquipo);
          setCanchaDeTenis(result.data.entity.canchaDeTenis);
          setCanchaDeFutbol(result.data.entity.canchaDeFutbol);
          setCanchaDePadel(result.data.entity.canchaDePadel);
        }
      });
    }
  }, []);

  return (
    <View>
      <Text
        onPress={() => {
          setTab(`home`);
        }}
        style={{fontSize: 14, color: `red`}}
      >
        Volver
      </Text>
      <Text style={{fontSize: 25}}>Crear pedido de cancha</Text>
      <PermissionInput
        text={`Cancha de tenis`}
        textLeft
        setter={() => {
          setCanchaDeTenis(!canchaDeTenis);
          setCanchaDeFutbol(false);
          setCanchaDePadel(false);
        }}
        value={canchaDeTenis}
      />
      <PermissionInput
        text={`Cancha de futbol`}
        textLeft
        setter={() => {
          setCanchaDeFutbol(!canchaDeFutbol);
          setCanchaDeTenis(false);
          setCanchaDePadel(false);
        }}
        value={canchaDeFutbol}
      />
      <PermissionInput
        text={`Cancha de padel`}
        textLeft
        setter={() => {
          setCanchaDePadel(!canchaDePadel);
          setCanchaDeFutbol(false);
          setCanchaDeTenis(false);
        }}
        value={canchaDePadel}
      />
      <View style={homeStyle.inputGroup}>
        <View style={{width: `30%`}}>
          <HourInput text={`Hora`} value={hour} setter={setHour} />
        </View>
        <View style={{width: `30%`}}>
          <PermissionInput text={`Lleva equipo?  `} textLeft setter={setLlevarEquipo} value={llevaEquipo} />
        </View>
      </View>
      <View
        onTouchEnd={() => {
          if (canchaCurrentId) {
            editarCancha(canchaCurrentId, {
              hour,
              llevaEquipo,
              canchaDeTenis,
              canchaDeFutbol,
              canchaDePadel
            }).then((result) => {
              if (result.status == 200) {
                setTab(`home`);
              }
            });
          } else {
            crearCancha({
              hour,
              llevaEquipo,
              canchaDeTenis,
              canchaDeFutbol,
              canchaDePadel
            }).then((result) => {
              if (result.status == 200) {
                setTab(`home`);
              }
            });
          }
        }}
        style={homeStyle.button}
      >
        <Text style={homeStyle.textButton}>{canchaCurrentId ? `Guardar cambios` : `Crear cancha`}</Text>
      </View>
    </View>
  );
}

function MainCanchas({setTab, setCanchaCurrentId, canchaCurrentId}) {
  const [canchas, setCanchas] = useState([]);
  const [popup, setPopup] = useState(false);
  const [currentId, setCurrentId] = useState(-1);

  useEffect(() => {
    getCanchas().then((response) => {
      if (response.status == 200) {
        setCanchas(
          response.data.map((cancha) => {
            let canchaType = ``;
            if (cancha.canchaDeTenis) {
              canchaType = `Tenis`;
            }
            if (cancha.canchaDeFutbol) {
              canchaType = `Futbol`;
            }
            if (cancha.canchaDePadel) {
              canchaType = `Padel`;
            }
            return {...cancha, hour: new Date(cancha.hour), canchaType};
          })
        );
      }
    });
  }, [popup]);
  return (
    <ScrollView>
      <View style={{minHeight: 500}}>
        <Text style={{fontSize: 25}}>Mis Canchas</Text>
        {canchas.map((cancha) => {
          return (
            <Cancha
              setCurrentId={setCurrentId}
              setPopup={setPopup}
              setTab={setTab}
              setCanchaCurrentId={setCanchaCurrentId}
              canchaData={cancha}
            />
          );
        })}
        {popup && (
          <PopUp
            Element={() => {
              return <DeleteCanchaPopup currentId={currentId} setCurrentId={setCurrentId} setPopup={setPopup} />;
            }}
          />
        )}
      </View>

      <View
        style={homeStyle.button}
        onTouchStart={() => {
          setTab(`creational`);
        }}
      >
        <Text onPress={() => {}} style={homeStyle.textButton}>
          {`Crear cancha`}
        </Text>
      </View>
    </ScrollView>
  );
}

function DeleteCanchaPopup({setPopup, setCurrentId, currentId}) {
  const toast = useToast();
  const {tokenId} = useContext(AuthContext);
  return (
    <View>
      <Text style={{fontSize: 20, color: `red`, marginLeft: `5%`}}>Está seguro que desea borrar la invitacion?</Text>
      <View style={{display: `flex`, flexDirection: `row`, justifyContent: `space-around`}}>
        <View
          style={{...homeStyle.button, width: `40%`}}
          onTouchStart={() => {
            deleteCancha(currentId).then((result) => {
              if (result.status == 200) {
                console.log(`ENTRO ACA NO?`);
                setCurrentId(-1);
                setPopup(false);
              }
            });
          }}
        >
          <Text
            onPress={() => {}}
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
        <View style={{...homeStyle.button, width: `40%`}}>
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

export function CanchasScreen() {
  return <Canchas></Canchas>;
}

function getFormattedDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function Cancha({canchaData, setCanchaCurrentId, setTab, setPopup, setCurrentId}) {
  console.log(canchaData, `CANCHA DATA`);
  return (
    <View style={homeStyle.canchaContainer}>
      <Text>{canchaData.canchaType}</Text>
      <View style={homeStyle.canchaContainerButtons}>
        <Text
          onPressIn={() => {
            setPopup(true);
            setCurrentId(canchaData.id);
          }}
          style={{marginRight: 15}}
          onPress={() => {}}
        >
          <FontAwesome name={`trash`} color={`red`} size={20} />
        </Text>
        <Text
          onPress={() => {
            setCanchaCurrentId(canchaData.id);
            setTab(`edit`);
          }}
          style={{marginRight: 15}}
        >
          <FontAwesome name={`edit`} color={`#444`} size={20} />
        </Text>
        <Text>{getFormattedDate(canchaData.hour)}</Text>
      </View>
    </View>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    padding: 40
  },
  canchaContainer: {
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `space-between`,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `gray`,
    padding: 20,
    marginTop: 15
  },
  canchaContainerButtons: {
    display: `flex`,
    flexDirection: `row`
  },
  inputGroup: {
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `space-around`,
    width: `100%`,
    alignItems: `center`,
    marginTop: 10
  },
  textButton: {
    fontWeight: `400`,
    color: `white`,
    fontSize: 22,
    textAlign: `center`
  },
  button: {
    marginTop: 20,
    backgroundColor: PRIMARY_COLOR,
    color: PRIMARY_TEXT_COLOR,
    marginHorizontal: 80,
    borderRadius: 10,
    justifyContent: `center`,
    alignSelf: `center`,
    width: 300,
    height: 40
  }
});

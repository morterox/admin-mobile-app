import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Linking, ScrollView} from 'react-native';
import HomeInfo from '../components/Home/HomeInfo';
import {PRIMARY_COLOR, PRIMARY_TEXT_COLOR, SECONDARY_COLOR} from '../styles/common';
import {useNavigation} from '@react-navigation/native';
import HomeCarousel from '../components/Home/HomeCarousel';
import {useToast} from 'react-native-toast-notifications';
import {crearPedido, deletePedido, editarPedido, getBoletinUrl, getPedidos, getPedidoById} from '../services/api';
import {Dimensions} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import PedidoDescriptionInput from '../components/Inputs/PedidoDescription';
import HourInput from '../components/Inputs/Hour';
import PermissionInput from '../components/Inputs/PermissionInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PopUp} from './CreateInvitation';
import FullNameInput from '../components/Inputs/Fullname';
import SupportCommentInput from '../components/Inputs/SupportComment';
import {horizontalStackLayout} from 'react-native-reanimated-carousel/lib/typescript/layouts/stack';

const platosPrincipales = [
  {
    id: 1,
    name: `Pizza Margarita`,
    category: `PLATO_PRINCIPAL`,
    image: `https://carta.menu/storage/media/dishes_main/2220550/conversions/dish_thumbnail.jpg`
  },
  {
    id: 2,
    name: `Fetuccini Carbonara`,
    category: `PLATO_PRINCIPAL`,
    image: `https://carta.menu/storage/media/dishes_main/74342/conversions/dish_thumbnail.jpg`
  },
  {
    id: 3,
    name: `Hamburguesa de la Casa`,
    category: `PLATO_PRINCIPAL`,
    image: `https://carta.menu/storage/media/dishes_main/2220557/conversions/dish_thumbnail.jpg`
  },
  {
    id: 4,
    name: `Roll California`,
    category: `PLATO_PRINCIPAL`,
    image: `https://carta.menu/storage/media/dishes_main/74494/conversions/dish_thumbnail.jpg`
  }
];

const entradas = [
  {
    id: 5,
    name: `Ensalada Caesar`,
    category: `GUARNICION`,
    image: `https://carta.menu/storage/media/dishes_main/2220561/conversions/dish_thumbnail.jpg`
  },
  {
    id: 6,
    name: `Papas Fritas`,
    category: `GUARNICION`,
    image: `https://www.cocinacaserayfacil.net/wp-content/uploads/2019/01/Patatas-fritas-caseras-perfectas-y-crujientes.jpg`
  },
  {
    id: 7,
    name: `Puré de Papa`,
    category: `GUARNICION`,
    image: `https://scm-assets.constant.co/scm/unilever/e9dc924f238fa6cc29465942875fe8f0/c02ffcb6-feee-4d8d-bd73-10dc97cd8ce5.jpg`
  },
  {
    id: 8,
    name: `Ensalada Mixta`,
    category: `GUARNICION`,
    image: `https://airescriollos.com.ar/wp-content/uploads/2020/11/Guarnicion-ensalada-mixta.jpg`
  }
];

const postres = [
  {
    id: 9,
    name: `Flan con Dulce de Leche y Crema`,
    category: `POSTRE`,
    image: `https://media-cdn.tripadvisor.com/media/photo-s/13/a7/1e/50/flan-con-crema-y-dulce.jpg`
  },
  {
    id: 10,
    name: `Ensalada de Frutas`,
    category: `POSTRE`,
    image: `https://i.ytimg.com/vi/RqT-UKZl6gQ/maxresdefault.jpg`
  },
  {
    id: 11,
    name: `Copa de la Casa`,
    category: `POSTRE`,
    image: `https://content-cocina.lecturas.com/medio/2018/11/23/copa_de_helado_con_flan_32e73edb_600x600.jpg`
  },
  {
    id: 12,
    name: `Queso y Dulce`,
    category: `POSTRE`,
    image: `https://airescriollos.com.ar/wp-content/uploads/2020/11/queso-y-dulce.jpg`
  }
];

const bebidas = [
  {
    id: 13,
    name: `Coca-Cola 1,5L`,
    category: `BEBIDA`,
    image: `https://www.rimoldimayorista.com.ar/datos/uploads/mod_catalogo/31308/coca-1-5-605e30445448a.jpg`
  },
  {
    id: 14,
    name: `Sprite 1,5L`,
    category: `BEBIDA`,
    image: `https://carrefourar.vtexassets.com/arquivos/ids/232328/7790895000447_02.jpg?v=637763940887870000`
  },
  {
    id: 15,
    name: `Agua Mineral 1,5L`,
    category: `BEBIDA`,
    image: `http://d3ugyf2ht6aenh.cloudfront.net/stores/001/157/846/products/556225-800-auto11-6873ce0acf40df215b16354448519602-640-0.jpg`
  },
  {
    id: 16,
    name: `Sifón de Soda 1L`,
    category: `BEBIDA`,
    image: `http://www.labuenaesperanza.com.ar/wp-content/uploads/2015/07/sifon-retornable.jpg`
  }
];

export default function Pedidos({}) {
  const [tab, setTab] = useState(`home`);
  const [pedidoCurrentId, setPedidoCurrentId] = useState();

  return (
    <View style={homeStyle.container}>
      {tab == `home` && <MainComensales setPedidoCurrentId={setPedidoCurrentId} setTab={setTab} />}
      {tab == `creational` && <CreatePedido setTab={setTab} />}
      {tab == `edit` && (
        <CreatePedido setPedidoCurrentId={setPedidoCurrentId} pedidoCurrentId={pedidoCurrentId} setTab={setTab} />
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

function ExpandableView({obj, setObj, label, items}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={{display: `flex`, flexDirection: `column`, width: `100%`}}>
      <View
        onTouchEnd={() => {
          setExpanded(!expanded);
        }}
        style={{
          display: `flex`,
          flexDirection: `row`,
          justifyContent: `space-between`,
          width: `100%`,
          padding: 5,
          borderRadius: 15,
          borderColor: `grey`,
          borderWidth: 1
        }}
      >
        <Text>{label}</Text>
        <Text>
          <FontAwesome name={expanded ? `chevron-up` : `chevron-down`} color={`#444`} size={18} />
        </Text>
      </View>
      {expanded &&
        items.map((item) => {
          return <CatalogoItem obj={obj} setObj={setObj} data={item} amount={obj[item.name] ? obj[item.name] : 0} />;
        })}
    </View>
  );
}

function CreatePedido({setTab, setPedidoCurrentId, pedidoCurrentId}) {
  const {socioId} = useContext(AuthContext);
  const [address, setAddress] = useState(``);
  const [nota, setNota] = useState(``);
  const [hour, setHour] = useState(new Date());
  const [paraLlevar, setParaLlevar] = useState(true);
  const [obj, setObj] = useState({});

  useEffect(() => {
    if (pedidoCurrentId != null && pedidoCurrentId != undefined) {
      getPedidoById(pedidoCurrentId).then((result) => {
        if (result.status == 200 && result.data) {
          setAddress(result.data.entity.address);
          setHour(new Date(result.data.entity.hora));
          setNota(result.data.entity.nota);
          setParaLlevar(result.data.entity.takeout);
          setObj(JSON.parse(result.data.entity.description));
        }
      });
    }
  }, []);

  return (
    <ScrollView style={{width: `100%`}}>
      <View style={{height: 800}}>
        <Text
          onPress={() => {
            setTab(`home`);
          }}
          style={{fontSize: 14, color: `red`}}
        >
          Volver
        </Text>
        <Text style={{fontSize: 25}}>Crear pedido</Text>
        <ExpandableView items={entradas} label={`ENTRADAS`} obj={obj} setObj={setObj} />
        <ExpandableView items={platosPrincipales} label={`PLATOS PRINCIPALES`} obj={obj} setObj={setObj} />
        <ExpandableView items={postres} label={`POSTRES`} obj={obj} setObj={setObj} />
        <ExpandableView items={bebidas} label={`BEBIDAS`} obj={obj} setObj={setObj} />
        <FullNameInput label={`Direccion`} setter={setAddress} value={address} />
        <Text>Nota</Text>
        <SupportCommentInput value={nota} setter={setNota} />
        <View style={homeStyle.inputGroup}>
          <View style={{width: `30%`}}>
            <HourInput text={`Hora`} value={hour} setter={setHour} />
          </View>
          <View style={{width: `30%`}}>
            <PermissionInput text={`Para llevar?  `} textLeft setter={setParaLlevar} value={paraLlevar} />
          </View>
        </View>
        <View
          onTouchEnd={() => {
            if (pedidoCurrentId) {
              editarPedido(pedidoCurrentId, {
                description: JSON.stringify(obj),
                takeout: paraLlevar ? true : false,
                address,
                hora: hour,
                nota,
                idSocio: socioId
              }).then((result) => {
                if (result.status == 200) {
                  setTab(`home`);
                }
              });
            } else {
              crearPedido({
                description: JSON.stringify(obj),
                takeout: paraLlevar ? true : false,
                address,
                hora: hour,
                nota,
                idSocio: socioId
              }).then((result) => {
                if (result.status == 200) {
                  setTab(`home`);
                }
              });
            }
          }}
          style={homeStyle.button}
        >
          <Text style={homeStyle.textButton}>{pedidoCurrentId ? `Guardar cambios` : `Crear pedido`}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function MainComensales({setTab, setPedidoCurrentId, pedidoCurrentId}) {
  const {socioId} = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [popup, setPopup] = useState(false);
  const [currentId, setCurrentId] = useState(-1);

  useEffect(() => {
    getPedidos(socioId).then((response) => {
      if (response.status == 200) {
        setPedidos(
          response.data.map((pedido) => {
            console.log(pedido, `PEDIDO`);
            return {
              fecha: new Date(pedido.hora),
              id: pedido.id,
              pedido: pedido.address
            };
          })
        );
      }
    });
  }, [popup]);
  return (
    <ScrollView>
      <View style={{minHeight: 500}}>
        <Text style={{fontSize: 25}}>Mis Pedidos</Text>
        {pedidos.map((pedido) => {
          return (
            <Pedido
              setCurrentId={setCurrentId}
              setPopup={setPopup}
              setTab={setTab}
              setPedidoCurrentId={setPedidoCurrentId}
              pedidoData={pedido}
            />
          );
        })}
        {popup && (
          <PopUp
            Element={() => {
              return <DeletePedidoPopup currentId={currentId} setCurrentId={setCurrentId} setPopup={setPopup} />;
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
          {`Crear pedido`}
        </Text>
      </View>
    </ScrollView>
  );
}

function DeletePedidoPopup({setPopup, setCurrentId, currentId}) {
  const toast = useToast();
  const {tokenId} = useContext(AuthContext);
  return (
    <View>
      <Text style={{fontSize: 20, color: `red`, marginLeft: `5%`}}>Está seguro que desea borrar la invitacion?</Text>
      <View style={{display: `flex`, flexDirection: `row`, justifyContent: `space-around`}}>
        <View
          style={{...homeStyle.button, width: `40%`}}
          onTouchStart={() => {
            deletePedido(currentId).then((result) => {
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

export function PedidosScreen() {
  return <Pedidos></Pedidos>;
}

function getFormattedDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function Pedido({pedidoData, setPedidoCurrentId, setTab, setPopup, setCurrentId}) {
  return (
    <View style={homeStyle.pedidoContainer}>
      <Text>{pedidoData.pedido}</Text>
      <View style={homeStyle.pedidoContainerButtons}>
        <Text
          onPressIn={() => {
            setPopup(true);
            setCurrentId(pedidoData.id);
          }}
          style={{marginRight: 15}}
          onPress={() => {}}
        >
          <FontAwesome name={`trash`} color={`red`} size={20} />
        </Text>
        <Text
          onPress={() => {
            setPedidoCurrentId(pedidoData.id);
            setTab(`edit`);
          }}
          style={{marginRight: 15}}
        >
          <FontAwesome name={`edit`} color={`#444`} size={20} />
        </Text>
        <Text>{getFormattedDate(pedidoData.fecha)}</Text>
      </View>
    </View>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    padding: 5
  },
  pedidoContainer: {
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `space-between`,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `gray`,
    padding: 20,
    marginTop: 15
  },
  pedidoContainerButtons: {
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

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView
} from 'react-native';

export default class Savedsul extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      data: [
        {id:1,  name: "1932 새싹땅콩+햅쌀/흑미",   position:"탁주",               image:"https://thesool.com/common/imageView.do?targetId=PR00000210&targetNm=PRODUCT", about:"당해연도 고시히카리쌀과 진도산 흑미를 주 원료로 사용하였다. 새싹땅콩의 항산화 물질인 ‘레즈베라트롤’이다량 함유 되었있고, 전통누룩에서 뽑아낸 우수한 균주를 사용하였다. 합성감미료는 사용하지 않았으며, 미생물 발효 조절방식으로 냉장보관 시 신선한 맛과 주질을 유지할 수 있다. 고급한정식당, 호텔, 백화점 위주로 납품되어지고 있다."},
        {id:2,  name: "2017년 햅쌀로 빚은 첫술",   position:"탁주",               image:"https://thesool.com/common/imageView.do?targetId=PR00000211&targetNm=PRODUCT", about:"2017년 햅쌀로 빚은 첫술은 매년 가을철, 그 해 수확한 햅쌀로 빚은 프리미엄 생 막걸리로 계절 한정 상품으로 선보인다. 올해 수확한 경북 안동 햅쌀을 원료로 빚어, 생 막걸리 특유의 탄산감이 살아있으면서도 부드럽고 신선한 쌀의 향과 맛을 느낄 수 있다."},
        {id:3,  name: "52C",  position:"증류주", image:"https://thesool.com/common/imageView.do?targetId=PR00000737&targetNm=PRODUCT", about:"오이처럼 cool 하게 즐기는 싱싱한 오이 증류주. 예전에 유행했던 소주에 오이를 넣어 마시는 오이소주를 떠올리며 만든 술이다. 오이를 소주에 담그면 오이의 색과 향이 소주의 알코올 성분에 침출되어 소주 특유의 쓴 맛과 아로올 취를 부드럽게 하여 술 맛을 순하게 하고 이뇨작용을 활발하게 해주어 체내의 노폐물 배설을 도와주기도 한다고 한다. 오이는 차가운 성질이라 여름에 술 마실 때 나타나는 체온 상승을 어느 정도 억제해주고, 오이의 다양한 비타민은 숙취 해소에 효과가 있다고 한다. 이런 오이의 장점을 침출해 만든 세계 최초의 증류주가 52C이다. 52C를 마시면 입안 가득 오이와 멜론 향이 퍼진다."} ,
        {id:4,  name: "DOK막걸리", position:"탁주",     image:"https://thesool.com/common/imageView.do?targetId=PR00000669&targetNm=PRODUCT", about:"DOK막걸리는 우리 누룩 특유의 발효 특성을 연구하여 출시한 막걸리로 막걸리 본연의 맛을 낼 수 있도록 노력한 결과입니다. 잘 익은 참외와 멜론의 달콤하고 상큼한 과육향을 싱그럽고 경쾌하게 즐길 수 있는 프리미엄 막걸리입니다."} ,
        {id:5,  name: "G12 골디락스", position:"탁주",   image:"https://thesool.com/common/imageView.do?targetId=PR00000707&targetNm=PRODUCT", about:"싱그러운 과일향과 부드러운 목 넘김으로 마시기 딱 좋은 막걸리. Ice 공법으로 차갑게 발효하고 더 차갑게 숙성했다. 담백한 맛의 멥쌀과 감칠맛 나는 찹쌀을 오랜 연구개발 끝에 최적의 비율로 사용하여 소박한 단맛을 구현하였고, 여기에 12℃ 저온에서 30일간의 발효와 12℃에서 30일간의 숙성 과정을 거친 깔끔한 막걸리이다. 제품명 G12에서 12는 알코올 도수 12도를 의미하고, G는 마시기 딱 좋은 조화로운 맛의 균형이라는 제품 특성을 담을 수 있도록 Goldilocks의 첫 글자를 따서 이름을 지었다. Goldilocks는 영국의 전래동화 &amp;#039;골디락스와 세 마리 곰&amp;#039; 주인공 소녀의 이름에서 유래한 용어로 뜨겁지도 차갑지도 않은 적당한 상태를 의미한다."} ,
        {id:6,  name: "The 찾을수록",   position:"증류주", image:"https://thesool.com/common/imageView.do?targetId=PR00000554&targetNm=PRODUCT", about:"더찾을수록 시리즈는 한국애플리즈는 7년의 부단한 연구개발 끝에 2013년 사과와인을 베이스로한 사과소주 6종을 출시하였다. 복숭아, 청포도, 사과, 감귤, 생강, 아메리카노를 가미하여 탄생한 6종의 사과소주다. 패키지 디자인은 녹색 희석식 소주와 흡사하지만 제품은 증류주가 아닌 과실주로 분류된다. 미국 마켓의 경우 맥주와 와인 판매허가만 있는 경우 소주를 판매할 수 없는 점에 착안하여 디자인은 소주이나 제품은 사과와인으로 미국 내 많은 마켓에 입점하기 위한 전략에서 디자인된 제품이다."},
      ]
    };
  }

  clickEventListener = (item) => {
    this.setState({userSelected: item}, () =>{
      this.setModalVisible(true);
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
          
        <FlatList 
          style={styles.userList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (

            <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
              <Image style={styles.image} source={{uri: item.image}}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.position}>{item.position}</Text>
                <TouchableOpacity style={styles.followButton} onPress={()=> this.clickEventListener(item)}>
                  <Text style={styles.followButtonText}>저장하기</Text>  
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}}/>

        <Modal
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}>

          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <ScrollView contentContainerStyle={styles.modalInfo}>
                    <Image style={styles.image} source={{uri: this.state.userSelected.image}}/>
                    <Text style={styles.name}>{this.state.userSelected.name}</Text>
                    <Text style={styles.position}>{this.state.userSelected.position}</Text>
                    <Text style={styles.about}>{this.state.userSelected.about}</Text>
                </ScrollView>
              </View>
              <View style={styles.popupButtons}>
                <TouchableOpacity onPress={() => {this.setModalVisible(false) }} style={styles.btnClose}>
                  <Text style={styles.txtClose}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#eeeeee"
  },
  header:{
    backgroundColor: "#00CED1",
    height:200
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
    flex:1,
  },
  detailContent:{
    top:80,
    height:500,
    width:Dimensions.get('screen').width - 90,
    marginHorizontal:30,
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  userList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:100,
    height:100,
    borderRadius:45,
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row'
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#008080",
    fontWeight:'bold'
  },
  position:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  about:{
    marginHorizontal:10
  },

  followButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
 /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height:250,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent:'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose:{
    height:20,
    backgroundColor:'#20b2aa',
    padding:20
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
  }
});
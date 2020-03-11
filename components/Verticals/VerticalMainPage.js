import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Alert
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Search from "../../assets/js/Search";
import MyButton from "../CustomComponents/MyButton";
import TextInputWithIcon from "../CustomComponents/TextInputWithIcon";
import Dashboard from "../Dashboard";
import ProfileDetails from "../UserManagement/ProfileDetails";
import {
  Container,
  Content,
  Footer,
  Form,
  Item,
  Input,
  Label,
  Card,
  CardItem,
  Textarea,
  Right,
  Icon,
  Left,
  Body,
  Toast,
  Root
} from "native-base";
import Loader from "../Navigation/Loader";
import PageHeader from "../CustomComponents/PageHeader";
import axios from "axios";
import BackArrow from "../../assets/js/BackArrow";
import Delete from "../../assets/js/Delete";
import Edit from "../../assets/js/Edit";
import CreateVertical from "./CreateVertical";
import { TextInput } from "react-native-gesture-handler";
const VerticalsMainPage = props => {
  const [Verticals_list, setVertical] = useState([]);
  const [tableKey, setTableKey] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [searchval, setSearchVal] = useState("");

  const [searchbarValue, setSearch] = useState("");
  const [prev, setPrev] = useState(null);
  const [num, setNum] = useState([0]);
  const [next, setNext] = useState(2);
  const [total, setTotal] = useState([0]);
  const [limit, setLimit] = useState([0]);
  const [pageno, setPageNo] = useState(2);
  const [indicator, setIndicator] = useState(false);

  function updatekey(a) {
    setTableKey(a);
  }
  function CreateVertical() {
    updatekey();
    props.navigation.navigate("CreateVertical", { func: updatekey });
  }
  function GotoVertical(id, name, desc, url) {
    props.navigation.navigate("CreateVerticalFields", {
      fun: fun,
      vertical_id: id,
      name: name,
      desc: desc,
      url: url,
      funcRender: updatekey,
      button: true
    });
  }
  function dashboard() {
    props.navigation.navigate("Dashboard");
  }

  const getdata1 = a => {
    if (a == 2) {
      // console.log("on button lcikc");
      setPageNo(2);
      const data = {
        page: 1,
        limit: 10,
        search: searchval ? searchval : "",
        sortby: {
          created: -1
        }
      };
      // console.log("getdata1  data === ", data);
      const config = {
        url: "https://api.leadswatch.com/api/v1/vertical/list",
        data: data,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };

      axios(config)
        .then(response => {
          // console.log("response of the getdataaa", response);
          setVertical(response.data.data.list);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // console.log("on button lcikc");
      // setPageNo(2);
      // console.log("adadajbdada buyer statys======", buyerstatus);
      const data = {
        page: 1,
        limit: 10,
        search: "",
        sortby: {
          created: -1
        }
      };
      // console.log("getdata1  data === ", data);
      const config = {
        url: "https://api.leadswatch.com/api/v1/vertical/list",
        data: data,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };
      axios(config)
        .then(response => {
          setVertical(response.data.data.list);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const data = {
      page: 1,
      limit: 10,
      search: "",
      sortby: {
        created: -1
      }
    };
    const config = {
      url: "https://api.leadswatch.com/api/v1/vertical/list",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log("GotVerticalsList", response);
        setFetching(false);
        setVertical(response.data.data.list);
        setTotal(response.data.data.total_count);
        setPrev(response.data.data.prev_page);
        setNext(response.data.data.next_page);
        let a = [];
        for (
          let i = 1;
          i <=
          Math.ceil(
            response.data.data.total_count / response.data.data.per_page
          );
          i++
        ) {
          a.push(i);
        }
        setNum(a);

        setLimit(response.data.data.per_page);
      })
      // Error handling
      .catch(error => {
        if (error.message == "Network Error") {
          Alert.alert(
            "Network Error",
            "Please try again after some time",
            [
              {
                text: "Ok",
                onPress: () => console.log("Network Problem:)")
              }
            ],
            { cancelable: false }
          );
        }
        console.log(error.response);
        Alert.alert(
          "Error",
          error.response.data.error.message,
          [
            {
              text: "Ok"
              // onPress: () => console.log('Enter Valid Details'),
            }
          ],
          { cancelable: false }
        );
      });
  }, [tableKey]);

  const getDetails = () => {
    if (Verticals_list.length != total) setIndicator(true);
    const data = {
      page: pageno,
      limit: 10,
      search: searchval ? searchval : "",
      sortby: {
        created: -1
      }
    };
    console.log("get details data ===== ", data);
    const config = {
      url: "https://api.leadswatch.com/api/v1/vertical/list",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        //  console.log("BuyerList", response);
        // Buyers list is set to deals state
        console.log("response on touch end", response.data.data.list);
        //setNextPage(response.data.data.next_page);
        if (response.data.data.list.length > 0) {
          temp = [...Verticals_list, ...response.data.data.list];
          setVertical(temp);
        }
        // console.log("===============", deals.length);
        if (total == response.data.data.list.length) {
          setIndicator(false);
        }

        // To make activity Indicator off
        if (total == response.data.data.list.length) {
          setIndicator(false);
        }
        setIndicator(false);
        setFetching(false);
      })
      // Error handling
      .catch(error => {
        console.log("Buyerlisterror1", error);
        Alert.alert(error.response.data.error.message);
      });
  };

  function fun() {
    Toast.show({
      text: "Edited Successfully!!!",
      buttonText: "",
      duration: 2000,
      position: "center",
      style: { backgroundColor: "rgba(0,0,0,0.5)", top: "20%" }
    });
  }
  function deleteSure(id) {
    Alert.alert(
      "Alert",
      "Are You Sure You Want To Delete This??",
      [
        {
          text: "Cancel",
          style: "ok"
        },
        {
          text: "ok",
          onPress: () => DeleteVertical(id),
          style: "ok"
        }
      ],
      { cancelable: false }
    );
  }

  const DeleteVertical = id => {
    updatekey(id + Math.random());
    const data = {
      id: id
    };
    // console.log("Deleted Data Id", data)
    console.log(global.access_token);
    const config = {
      url: "https://api.leadswatch.com/api/v1/vertical/delete/" + id.toString(),
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        // console.log('Inside Delete Vertical---', response);
      })
      .catch(error => {
        if (error.message == "Network Error") {
          Alert.alert(
            "Network Error",
            "Please try again after some time",
            [
              {
                text: "Ok",
                onPress: () => console.log("Network problem")
              }
            ],
            { cancelable: false }
          );
        }
        console.log(error.response);
        Alert.alert(
          "error",
          error.response.data.error.message,
          [
            {
              text: "Ok",
              onPress: () => console.log("Enter Valid Details")
            }
          ],
          { cancelable: false }
        );
      });
  };

  const getDataWithoutFilter = () => {
    console.log("Inside");
    const data = {
      page: 1,
      limit: 10,
      search: "",
      sortby: {
        created: -1
      }
    };
    const config = {
      url: "https://api.leadswatch.com/api/v1/vertical/list",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log("GotVerticalsList1233", response);
        setFetching(false);
        setVertical(response.data.data.list);
        setTotal(response.data.data.total_count);
        setPrev(response.data.data.prev_page);
        setNext(response.data.data.next_page);
        let a = [];
        for (
          let i = 1;
          i <=
          Math.ceil(
            response.data.data.total_count / response.data.data.per_page
          );
          i++
        ) {
          a.push(i);
        }
        setNum(a);

        setLimit(response.data.data.per_page);
      })
      // Error handling
      .catch(error => {
        if (error.message == "Network Error") {
          Alert.alert(
            "Network Error",
            "Please try again after some time",
            [
              {
                text: "Ok",
                onPress: () => console.log("Network Problem:)")
              }
            ],
            { cancelable: false }
          );
        }
        console.log(error.response);
        Alert.alert(
          "Error",
          error.response.data.error.message,
          [
            {
              text: "Ok"
              // onPress: () => console.log('Enter Valid Details'),
            }
          ],
          { cancelable: false }
        );
      });
  };

  const list_items =
    Verticals_list.length > 0 ? (
      Verticals_list.map(item => (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
          key={item.id}
        >
          <Card
            style={{
              width: wp(90.66),
              // height: hp(8.77),
              borderRadius: 10,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "transparent",
              elevation: 0
            }}
          >
            <CardItem
              style={{
                width: wp(90.66),
                // height: hp(8.77),
                borderRadius: 4,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <View style={{ width: wp(1.52) }}></View>
              <Text style={styles.textStyle}>{item.name}</Text>
              <View style={{ width: wp(6.52) }}></View>
              <TouchableOpacity
                onPress={() =>
                  GotoVertical(item.id, item.name, item.desc, item.url)
                }
              >
                <Edit width={15} height={15} />
              </TouchableOpacity>
              <View style={{ width: wp(5.52) }}></View>
              <TouchableOpacity onPress={() => deleteSure(item.id)}>
                <Delete width={15} height={15} />
              </TouchableOpacity>
            </CardItem>
          </Card>
          <View style={{ height: hp(0.4) }}></View>
        </View>
      ))
    ) : (
      <View
        style={{
          paddingTop: "5%",
          height: hp(100),
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start"
        }}
      >
        <Text style={{ color: "#A3A1C9", paddingTop: hp(29.73) }}>
          No Verticals Found!!!!
        </Text>
      </View>
    );

  return (
    <Root>
      <Container>
        <PageHeader
          title={"Verticals"}
          myfunc={() => dashboard()}
          profile={() => {
            props.navigation.navigate("ProfileDetails");
          }}
        ></PageHeader>

        {fetching && (
          // <View>
          //   <View style={{ height: hp(35) }} />
          //   <View >
          //     <ActivityIndicator size="large" color="#0000ff" />
          //   </View>
          // </View>
          <Loader />
        )}

        {!fetching && (
          <Content
            keyboardShouldPersistTaps={"handled"}
            style={{ backgroundColor: "#F3F4F7" }}
            onScroll={({ nativeEvent }) => {
              if (
                nativeEvent.layoutMeasurement.height +
                  nativeEvent.contentOffset.y >=
                nativeEvent.contentSize.height
              ) {
                setPageNo(pageno + 1);
                getDetails();
                //test();
              }
            }}
          >
            <Body>
              <View style={{ height: hp(2) }}></View>
              <View
                style={[
                  {
                    flexDirection: "row",
                    width: wp(90.666),
                    height: hp(5.911),
                    backgroundColor: "white",
                    borderRadius: 40,
                    justifyContent: "center",
                    alignItems: "center"
                  }
                ]}
              >
                <TextInput
                  style={{ width: "90%", paddingLeft: 20 }}
                  value={searchval}
                  onChangeText={setSearchVal}
                  placeholder="Search"
                  // onChange={() => {
                  //   console.log("Inside Tesxtijdc");
                  //   if (searchval == "") {
                  //     getDataWithoutFilter();
                  //   }
                  //   setSearchVal(searchval);
                  // }}
                />
                <TouchableOpacity onPress={() => getdata1(2)}>
                  <Search />
                </TouchableOpacity>
                <View style={{ width: wp(2) }} />
              </View>

              <ScrollView>
                <View>
                  <View style={{ height: hp(2.46) }}></View>
                  {list_items}
                  {indicator && (
                    <ActivityIndicator size="large" color="#0000ff" />
                  )}
                </View>
              </ScrollView>
            </Body>
            <View style={{ height: hp(9) }}></View>
          </Content>
        )}

        {!fetching && (
          <View>
            <View
              style={{
                position: "absolute",
                left: 20,
                bottom: 10,
                width: wp(90.66),
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <MyButton
                style={{
                  width: wp(90.66),
                  height: hp(7.211),
                  backgroundColor: "#00B0EB",
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                myfunc={() => CreateVertical()}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Create Vertical
                </Text>
              </MyButton>
            </View>
          </View>
        )}
      </Container>
    </Root>
  );
};
export default VerticalsMainPage;
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    margin: 7,

    color: "blue",
    backgroundColor: "transparent"
  },
  textStyle: {
    width: wp(60),
    // fontFamily: "Roboto",
    // backgroundColor: "red",
    fontSize: 16,
    color: "#00B0EB",
    fontWeight: "500"
  }
});

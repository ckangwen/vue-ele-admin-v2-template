import { Notification } from "element-ui";
import { login, getUserInfo } from "@/apis";
import { getToken, setToken, removeToken } from "@/libs/business";
import router, { resetRouter } from "@/router/index";

const moduleState = {
  token: getToken(),
  name: "",
  userInfo: {},
};

const moduleMutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_USER_INFO(state, user) {
    state.userInfo = user;
  },
};

const moduleActions = {
  login({ commit }, userInfo) {
    const { mobile, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        mobile: mobile.trim(),
        pass_word: password.trim(),
        token: userInfo.token || "",
      }).then((response) => {
        if (response.state == 1) {
          const { data } = response;
          const token = data.token || "";
          commit("SET_TOKEN", token);
          setToken(token);
          resolve(token);
        } else {
          Notification.error({
            title: "提示",
            message: response.message,
          });
          resolve("");
        }
      })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token).then((response) => {
        const { data } = response;
        if (data) {
          const userInfo = data;
          commit("SET_NAME", userInfo.title);
          commit("SET_USER_INFO", userInfo);
          resolve(userInfo);
        } else {
          reject(new Error(response.message));
        }
      })
        .catch((error) => {
          reject(error);
        });
    });
  },

  logout({ commit }) {
    return new Promise((resolve) => {
      commit("SET_NAME", "");
      commit("SET_TOKEN", "");
      removeToken();
      resetRouter();

      resolve();
    });
  },

  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_AUTH", []);
      removeToken();
      resolve();
    });
  },

  async changeRoles({ commit, dispatch }, token) {
    commit("SET_TOKEN", token);
    setToken(token);

    const { auth } = await dispatch("getInfo");

    resetRouter();

    const accessRoutes = await dispatch("permission/generateRoutes", auth, { root: true });
    router.addRoutes(accessRoutes);
  },
};

export default {
  namespaced: true,
  state: moduleState,
  mutations: moduleMutations,
  actions: moduleActions,
};

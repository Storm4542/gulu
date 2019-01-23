<template>
    <div>
        <div>
            <p>段落1</p>
            <p>段落2</p>
            <p>段落3</p>
            <p>段落4</p>
            <p>段落5</p>
            <p>段落6</p>
            <p>段落7</p>
            <p>段落8</p>
            <p>段落9</p>
            <p>段落10</p>
            <p>段落11</p>
            <p>段落12</p>
            <p>段落1</p>
            <p>段落2</p>
            <p>段落3</p>
            <p>段落4</p>
            <p>段落5</p>
            <p>段落6</p>
            <p>段落7</p>
            <p>段落8</p>
            <p>段落9</p>
            <p>段落10</p>
            <p>段落11</p>
            <p>段落12</p>
            <g-sticky :distance='100'>
                <div>我是一个粘滞标签</div>
            </g-sticky>
            <p>段落1</p>
            <p>段落2</p>
            <p>段落3</p>
            <p>段落4</p>
            <p>段落5</p>
            <p>段落6</p>
            <p>段落7</p>
            <p>段落8</p>
            <p>段落9</p>
            <p>段落10</p>
            <p>段落11</p>
            <p>段落12</p>
            <p>段落13</p>
            <p>段落14</p>
            <p>段落15</p>
            <p>段落16</p>
            <p>段落17</p>
            <p>段落18</p>
            <p>段落19</p>
            <p>段落20</p>
            <p>段落21</p>
            <p>段落22</p>
            <p>段落23</p>
            <p>段落24</p>
            <p>段落25</p>
            <p>段落26</p>
            <p>段落27</p>
            <p>段落28</p>
            <p>段落29</p>
            <p>段落30</p>
            <p>段落31</p>
            <p>段落32</p>
            <p>段落33</p>
            <p>段落34</p>
            <p>段落35</p>
            <p>段落36</p>
            <p>段落37</p>
            <p>段落38</p>
            <p>段落39</p>
            <p>段落40</p>
            <p>段落41</p>
            <p>段落42</p>
            <p>段落43</p>
            <p>段落44</p>
            <p>段落45</p>
            <p>段落46</p>
            <p>段落47</p>
            <p>段落48</p>
            <p>段落49</p>
            <p>段落50</p>
            <p>段落51</p>
            <p>段落52</p>
            <p>段落53</p>
            <p>段落54</p>
            <p>段落55</p>
            <p>段落56</p>
            <p>段落57</p>
            <p>段落58</p>
            <p>段落59</p>
            <p>段落60</p>
            <p>段落61</p>
            <p>段落62</p>
            <p>段落63</p>
            <p>段落64</p>
            <p>段落65</p>
            <p>段落66</p>
            <p>段落67</p>
            <p>段落68</p>
            <p>段落69</p>
            <p>段落70</p>
            <p>段落71</p>
            <p>段落72</p>
            <p>段落73</p>
            <p>段落74</p>
            <p>段落75</p>
            <p>段落76</p>
            <p>段落77</p>
            <p>段落78</p>
            <p>段落79</p>
            <p>段落80</p>
            <p>段落81</p>
            <p>段落82</p>
            <p>段落83</p>
            <p>段落84</p>
            <p>段落85</p>
            <p>段落86</p>
            <p>段落87</p>
            <p>段落88</p>
            <p>段落89</p>
            <p>段落90</p>
            <p>段落91</p>
            <p>段落92</p>
            <p>段落93</p>
            <p>段落94</p>
            <p>段落95</p>
            <p>段落96</p>
            <p>段落97</p>
            <p>段落98</p>
            <p>段落99</p>
            <p>段落100</p>

        </div>

    </div>
</template>

<script>
    import db from "../../tests/fixture/db";
    import Pager from "../pager";
    import GTable from "../table";
    import GUploader from "../uploader";
    import GSticky from '../sticky'
    import GButton from "../button/button";

    function ajax(parentId = 0) {
        return new Promise((resolve, reject) => {
            let result = db.filter(item => item.parent_id === parentId);
            resolve(result);
        });
    }

    export default {
        name: "demo",
        components: {Pager, GTable, GUploader, GSticky},
        data() {
            return {};
        },

        methods: {}
    };
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        margin: 40px;
        height: 350px;
        background: #ddd;
    }

    /* .grid-demo {
          height: 100px;
          border: 1px solid gray;
        }

        .sider {
          background: #333;
          width: 200px;
        }

        .sider .fade-enter,
        .sider.fade-leave-active {
          margin-left: -200px;
        }

        .header {
          background: #999;
          height: 100px;
        }

        .footer {
          background: #ccc;
          height: 100px;
        } */

    .demo {
        padding: 50px;
    }
</style>
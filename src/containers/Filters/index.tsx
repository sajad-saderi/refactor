import React, { useState } from "react";
import PriceSlider from "../../components/filters/PriceSlider";

const Filters = () => {
  return (
    <>
      <PriceSlider />
      <p>filter</p>
    </>
  );
};

export default Filters;

//   onSlide = (render, handle, value, un, percent) => {
//     // console.log("run")
//     this.props.setPrice(value);
//   };

//   render() {
//     const { t, showFilters, brands, brand, models, model, deliverAtRentersPlace, price, priceSort,
//       brandLoading, modelLoading } = this.props;
//     const { setBrandAndGetModels, setModel, toggleShowFilters, togglePriceSort,
//       toggleDeliverAtRentersPlace, setPrice, toggleToCarBodyType, carBodyType, stats } = this.props;
//     const { brandsEnglish, brandsFarsi } = brands;
//     const { modelsEnglish, modelsFarsi } = models;
//     const az = <span style={{}}>از</span>;
//     const ta = <span style={{}}>تا</span>;

//     console.log(  brands, brand, models, model, modelLoading);

//     return (
//       <>
//           <FilterAndSort className="filters_listing sticky_horizontal ">
//             <div className="container">
//               <ul className="clearfix">
//                 <li>
//                   <div className="switch-field">
//                     <input
//                       type="radio"
//                       id="all"
//                       name="listing_filter"
//                       value="all"
//                       checked={priceSort == "price"}
//                     />
//                     <label className="SORT_ASCENDING" onClick={(e) => { togglePriceSort("price") }}>قیمت کم به زیاد</label>
//                     <input
//                       type="radio"
//                       id="latest"
//                       name="listing_filter"
//                       value="latest"
//                       checked={priceSort == "-price"}
//                     />
//                     <label className="SORT_DESCENDING" onClick={(e) => { togglePriceSort("-price") }} >قیمت زیاد به کم</label>
//                   </div>
//                 </li>
//                 <li className="MoreFilterLoad">
//                   <a
//                     className="btn_filt"
//                     data-toggle="collapse"
//                     aria-expanded="false"
//                     aria-controls="filters"
//                     onClick={() => { toggleShowFilters(!showFilters) }}
//                   ><Icon name='options' /> {showFilters ? "جستجوی پیشرفته" : "جستجوی پیشرفته"}</a
//                   >
//                 </li>
//                 {/* <li>
//                   <div className="layout_view">
//                     <a href="#0" className="active"><i className="icon-th"></i></a>
//                     <a href="/listing-2"><i className="icon-th-list"></i></a>
//                     <a href="/list-map"><i className="icon-map"></i></a>
//                   </div>
//                 </li> */}
//                 {/* <li>
//                     <a
//                         className="btn_map"
//                         data-toggle="collapse"
//                         href="#collapseMap"
//                         aria-expanded="false"
//                         aria-controls="collapseMap"
//                         data-text-swap="Hide map"
//                         data-text-original="View on map"
//                         >View on map</a
//                     >
//                     </li> */}
//               </ul>
//             </div>
//           </FilterAndSort>
//         <Form>
//           {/* ==> sajad */}
//           {/* <FilterAndSort className="filters_listing sticky_horizontal hide_on_desktop"> */}
//           <Transition visible={showFilters} duration={300}>
//             <FiltersDiv className="collapse" id="filters">
//               <div className="container margin_16">
//                 <div className="row">
//                   <div className="col-12">
//                     <h6>قیمت</h6>
//                     <div className="rangeclass">
//                       <div className="row" style={{ padding: '20px', paddingTop: '0px' }}>
//                         <div className="col-6">
//                           <PriceCard number={price[0]} preNumber={az} fontSize={25}>
//                             در روز
//                           </PriceCard>
//                         </div>
//                         <div className="col-6">
//                           <PriceCard number={price[1]} preNumber={ta} fontSize={25}>
//                             در روز
//                           </PriceCard>
//                         </div>
//                       </div>
//                       <Nouislider
//                         range={{ min: 0, max: 2000000 }}
//                         start={price}
//                         margin={100000}
//                         connect
//                         direction={'rtl'}
//                         onEnd={this.onSlide}
//                         step={100000}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row margin_30_5">
//                   <div className="col-12">
//                     <h6>تحویل در محل</h6>
//                     <ul>
//                       <li>
//                         <label className="container_check"> تحویل در محل <small>{stats.deliver_at_renters_place}</small>
//                           <input
//                             onClick={() => { toggleDeliverAtRentersPlace(!deliverAtRentersPlace) }}
//                             type="checkbox"
//                             checked={deliverAtRentersPlace}
//                           />
//                           <span className="checkmark" />
//                         </label>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <h6 style={{ width: '100%', paddingRight: '15px', paddingLeft: '15px', paddingBottom: '0px', margin: '0 0 .48571429rem 0' }}>نوع شاسی</h6>
//                   <div className="col-6">
//                     <ul>
//                       <li>
//                         <label

//                           className="container_check" > سواری <small
//                           >{stats.body_style_set.find(x => x.id === 1).count}</small>
//                           <input onClick={(e) => { toggleToCarBodyType(1) }} type="checkbox" />
//                           <span className="checkmark"></span>
//                         </label>
//                       </li>
//                       <li>
//                         <label className="container_check"
//                         > مینی ون <small>{stats.body_style_set.find(x => x.id === 7).count}</small>
//                           <input onClick={(e) => { toggleToCarBodyType(7) }} type="checkbox" />
//                           <span className="checkmark"></span>
//                         </label>
//                       </li>
//                       <li>
//                         <label className="container_check"
//                         >  هاچ‌بک <small>{stats.body_style_set.find(x => x.id === 1).count}</small>
//                           <input onClick={(e) => { toggleToCarBodyType(9) }} type="checkbox" />
//                           <span className="checkmark"></span>
//                         </label>
//                       </li>
//                       <li>
//                         <label className="container_check"
//                         > شاسی‌بلند <small>{stats.body_style_set.find(x => x.id === 2).count}</small>
//                           <input onClick={(e) => { toggleToCarBodyType(2) }}
//                             type="checkbox" />
//                           <span className="checkmark"></span>
//                         </label>
//                       </li>
//                       <li>
//                         <label className="container_check"
//                         > کراس‌اور <small>{stats.body_style_set.find(x => x.id === 8).count}</small>
//                           <input onClick={(e) => { toggleToCarBodyType(8) }}
//                             type="checkbox" />
//                           <span className="checkmark"></span>
//                         </label>
//                       </li>

//                     </ul>
//                   </div>
//                   <div className="col-6" >
//                     <ul>
//                       <li>
//                         <label className="container_check"

//                         > کروک <small>{stats.body_style_set.find(x => x.id === 3).count}</small>
//                           <input onClick={(e) => { toggleToCarBodyType(3) }} type="checkbox" />
//                           <span className="checkmark"></span>
//                         </label>
//                       </li>
//                       <li>
//                         <label className="container_check"
//                         > کوپه <small>{stats.body_style_set.find(x => x.id === 4).count}</small>
//                           <input onClick={(e) => { toggleToCarBodyType(4) }} type="checkbox" />
//                           <span className="checkmark"></span>
//                         </label>
//                       </li>
//                       <li>
//                         <label className="container_check"
//                         > ون <small>{stats.body_style_set.find(x => x.id === 5).count}</small>
//                           <input onClick={(e) => { toggleToCarBodyType(5) }} type="checkbox" />
//                           <span className="checkmark"></span>
//                         </label>
//                       </li>
//                       <li>
//                         <label className="container_check"
//                         > وانت <small>{stats.body_style_set.find(x => x.id === 6).count}</small>
//                           <input onClick={(e) => { toggleToCarBodyType(6) }} type="checkbox" />
//                           <span className="checkmark"></span>
//                         </label>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-12">
//                   <div className=" field">
//                 <DropDownWithSearch
//                         loading={true}
//                         top="46"
//                         data={brandsFarsi}
//                         Select={(e) => {
//                           setBrandAndGetModels(e.value, "");
//                           // values.carDistrict = e.value
//                         }}
//                         IconTop="20"
//                         clearField={()=>{
//                           setBrandAndGetModels("", "");
//                         }}
//                         placeholder="برند"
//                         // disabled={brand == null || brand == ""}
//                         ></DropDownWithSearch>
//                         </div>
//                     {/* <Form.Dropdown
//                       name="carBrand"
//                       id="carBrand"
//                       label={t('carProperty.brand')}
//                       placeholder={t('carProperty.brand')}
//                       noResultsMessage={t('forms.error_no_result_found')}
//                       search
//                       selection
//                       clearable
//                       loading={brandLoading}
//                       options={
//                         i18n.language === 'en'
//                           ? brandsEnglish
//                           : brandsFarsi
//                       }
//                       // error={Boolean(errors.carBrand && touched.carBrand)}
//                       onChange={(e, data) => {
//                         if (data && data.name) {
//                           setBrandAndGetModels(data.value, "");
//                           // setFieldValue(data.name, data.value);
//                         }
//                       }}
//                       // onClose={(e, data) => {

//                       // }}
//                       // defaultValue={brand[0].value}
//                       value={brand}
//                     /> */}
//                     <div className=" field">
//                 <DropDownWithSearch
//                         loading={true}
//                         top="46"
//                         IconTop="20"
//                         data={modelsFarsi}
//                         Select={(e) => {
//                           setModel(e.value, "");
//                           // values.carDistrict = e.value
//                         }}
//                         clearField={()=>{
//                           setModel("", "");
//                         }}
//                         placeholder="مدل"
//                         disabled={modelLoading && !(brand == null || brand == "")}
//                         ></DropDownWithSearch>
//                         </div>
//                     {/* <Form.Dropdown
//                       name="carModel"
//                       id="carModel"
//                       search
//                       placeholder={t('carProperty.model')}
//                       noResultsMessage={t('forms.error_no_result_found')}
//                       // label={t('carProperty.model')}
//                       selection
//                       clearable
//                       loading={modelLoading && !(brand == null || brand == "")}
//                       disabled={brand == null || brand == ""}
//                       options={
//                         i18n.language === 'en'
//                           ? modelsEnglish
//                           : modelsFarsi
//                       }
//                       // error={Boolean(errors.carModel && touched.carModel)}
//                       onChange={(e, data) => {
//                         if (data && data.name) {
//                           setModel(data.value, "");
//                           // setFieldValue(data.name, data.value);
//                         }
//                       }}
//                       // onClose={(e, data) => {
//                       //   if (data && data.name) {
//                       //     setFieldTouched(data.name);
//                       //   }
//                       // }}
//                       // defaultValue={model[0].value}
//                       value={model}
//                     /> */}
//                   </div>
//                 </div>
//               </div>
//             </FiltersDiv>
//           </Transition>
//         </Form>

//         <aside className="col-lg-3 hide_on_mobile margin_16 " id="sidebar">
//           <Form>
//             <div id="filters_col">
//               {/* <a
//                 data-toggle="collapse"
//                 href="#collapseFilters"
//                 aria-expanded="false"
//                 aria-controls="collapseFilters"
//                 id="filters_col_bt"
//               >گزینه‌ها
//               </a> */}
//               <div className="collapse show" id="collapseFilters">
//                 <FilterType title='قیمت'>
//                   <div className="rangeclass">
//                     <div className="row" style={{ padding: '20px', paddingTop: '0px' }}>
//                       <div className="col-6">
//                         <PriceCard number={price[0]} preNumber={az} fontSize={25}>
//                           در روز
//                         </PriceCard>
//                       </div>
//                       <div className="col-6">
//                         <PriceCard moreThan={(price[1] >= 2000000)} number={price[1]} preNumber={ta} fontSize={25}>
//                           در روز
//                         </PriceCard>
//                       </div>
//                     </div>
//                     {/* ==> */}
//                     <Nouislider
//                       range={{ min: 0, max: 2000000 }}
//                       start={price}
//                       margin={100000}
//                       connect
//                       direction={'rtl'}
//                       onEnd={this.onSlide}
//                       step={100000}
//                     />
//                   </div>
//                   <br /><br />
//                   <ul>
//                     <li>
//                       <label className="container_check">تحویل در محل<small>{stats.deliver_at_renters_place}</small>
//                         <input
//                           onClick={() => { toggleDeliverAtRentersPlace(!deliverAtRentersPlace) }}
//                           type="checkbox"
//                           checked={deliverAtRentersPlace}
//                         />
//                         <span className="checkmark" />
//                       </label>
//                     </li>
//                   </ul>
//                 </FilterType>
//                 <FilterType title='نوع شاسی'>
//                   <ul>
//                     <li>
//                       <label

//                         className="container_check"
//                       > سواری <small>{stats.body_style_set.find(x => x.id === 1).count}</small>
//                         <input onClick={(e) => { toggleToCarBodyType(1) }} type="checkbox" />
//                         <span className="checkmark"></span>
//                       </label>
//                     </li>
//                     <li>
//                       <label className="container_check"
//                       > مینی ون <small>{stats.body_style_set.find(x => x.id === 7).count}</small>
//                         <input onClick={(e) => { toggleToCarBodyType(7) }} type="checkbox" />
//                         <span className="checkmark"></span>
//                       </label>
//                     </li>
//                     <li>
//                       <label className="container_check"
//                       >  هاچ‌بک <small>{stats.body_style_set.find(x => x.id === 9).count}</small>
//                         <input onClick={(e) => { toggleToCarBodyType(9) }} type="checkbox" />
//                         <span className="checkmark"></span>
//                       </label>
//                     </li>
//                     <li>
//                       <label className="container_check"
//                       >شاسی‌بلند<small>{stats.body_style_set.find(x => x.id === 2).count}</small>
//                         <input onClick={(e) => { toggleToCarBodyType(2) }}
//                           type="checkbox" />
//                         <span className="checkmark"></span>
//                       </label>
//                     </li>
//                     <li>
//                       <label className="container_check"
//                       >کراس‌اور<small>{stats.body_style_set.find(x => x.id === 8).count}</small>
//                         <input onClick={(e) => { toggleToCarBodyType(8) }}
//                           type="checkbox" />
//                         <span className="checkmark"></span>
//                       </label>
//                     </li>
//                     <li>
//                       <label className="container_check"

//                       >کروک<small>{stats.body_style_set.find(x => x.id === 3).count}</small>
//                         <input onClick={(e) => { toggleToCarBodyType(3) }} type="checkbox" />
//                         <span className="checkmark"></span>
//                       </label>
//                     </li>
//                     <li>
//                       <label className="container_check"
//                       >کوپه<small>{stats.body_style_set.find(x => x.id === 4).count}</small>
//                         <input onClick={(e) => { toggleToCarBodyType(4) }} type="checkbox" />
//                         <span className="checkmark"></span>
//                       </label>
//                     </li>
//                     <li>
//                       <label className="container_check"
//                       >ون <small>{stats.body_style_set.find(x => x.id === 5).count}</small>
//                         <input onClick={(e) => { toggleToCarBodyType(5) }} type="checkbox" />
//                         <span className="checkmark"></span>
//                       </label>
//                     </li>
//                     <li>
//                       <label className="container_check"
//                       >وانت<small>{stats.body_style_set.find(x => x.id === 6).count}</small>
//                         <input onClick={(e) => { toggleToCarBodyType(6) }} type="checkbox" />
//                         <span className="checkmark"></span>
//                       </label>
//                     </li>
//                   </ul>
//                 </FilterType>
//                 <FilterType title='برند'>
//                 <div className=" field">
//                 <DropDownWithSearch
//                         loading={true}
//                         top="46"
//                         data={brandsFarsi}
//                         Select={(e) => {
//                           setBrandAndGetModels(e.value, "");
//                           // values.carDistrict = e.value
//                         }}
//                         IconTop="20"
//                         clearField={()=>{
//                           setBrandAndGetModels("", "");
//                         }}
//                         placeholder="برند"
//                         // disabled={brand == null || brand == ""}
//                         ></DropDownWithSearch>
//                         </div>
//                   {/* <Form.Dropdown
//                     name="carBrand"
//                     id="carBrand"
//                     // label={t('carProperty.brand')}
//                     placeholder={t('carProperty.brand')}
//                     noResultsMessage={t('forms.error_no_result_found')}
//                     search
//                     selection
//                     clearable
//                     loading={brandLoading}
//                     options={
//                       i18n.language === 'en'
//                         ? brandsEnglish
//                         : brandsFarsi
//                     }
//                     // error={Boolean(errors.carBrand && touched.carBrand)}
//                     onChange={(e, data) => {
//                       if (data && data.name) {
//                         setBrandAndGetModels(data.value, "");
//                         // setFieldValue(data.name, data.value);
//                       }
//                     }}
//                     // onClose={(e, data) => {

//                     // }}
//                     // defaultValue={brand[0].value}
//                     value={brand}
//                   /> */}
//                 {!modelLoading  && <div className=" field">
//                  <DropDownWithSearch
//                         loading={true}
//                         top="46"
//                         IconTop="20"
//                         data={modelsFarsi}
//                         Select={(e) => {
//                           setModel(e.value, "");
//                           // values.carDistrict = e.value
//                         }}
//                         clearField={()=>{
//                           setModel("", "");
//                         }}
//                         placeholder="مدل"
//                         disabled={this.props.brand === null || this.props.brand == ""}
//                         ></DropDownWithSearch>
//                         </div>}
//                   {/* <Form.Dropdown
//                     name="carModel"
//                     id="carModel"
//                     search
//                     placeholder={t('carProperty.model')}
//                     noResultsMessage={t('forms.error_no_result_found')}
//                     // label={t('carProperty.model')}
//                     selection
//                     clearable
//                     loading={modelLoading && !(brand == null || brand == "")}
//                     disabled={!brand}
//                     options={
//                       i18n.language === 'en'
//                         ? modelsEnglish
//                         : modelsFarsi
//                     }
//                     // error={Boolean(errors.carModel && touched.carModel)}
//                     onChange={(e, data) => {
//                       if (data && data.name) {
//                         setModel(data.value, "");
//                         // setFieldValue(data.name, data.value);
//                       }
//                     }}
//                     // onClose={(e, data) => {
//                     //   if (data && data.name) {
//                     //     setFieldTouched(data.name);
//                     //   }
//                     // }}
//                     // defaultValue={model[0].value}
//                     value={model}
//                   /> */}
//                 </FilterType>
//               </div>
//             </div>
//           </Form>
//         </aside>
//       </>

//     )
//   }
// }

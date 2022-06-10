import { useContext, useEffect, useRef, useState } from 'react';
// import "./profile_info.scss";
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('../../../components/form/Button'));
// import Button from "../../../components/form/Button";
import context_user from '../../../context/User_info';
import modalContext from '../../../context/Modal_context';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';
const Edit_profile = dynamic(() => import('./Edit_profile'));
const NameAvatar = dynamic(() =>
  import('../../../components/name_avatar/avatar-name')
);
import languageCTX from '../../../context/languageCTX';
import { dynamicString } from '../../../helpers/dynamicString';
import { dateSlicer } from '../../../helpers/dateSlicer';
import { numberChanger } from '../../../../utils/numberChanger';
import Icon from '../../../components/Icons';

const Profile_info = ({ is_mine, data, language }: IProfile_info) => {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [company_name, setCompany_name] = useState(null);
  const [edit, setEdit] = useState(false);
  const [user_info, setUser_info] = useState(null);
  const [triggerUpload, setTriggerUpload] = useState(false);
  const user = useContext(context_user);
  const modalCTX = useContext(modalContext);
  const { activeLanguage } = useContext(languageCTX);
  const router = useRouter();
  useEffect(() => {
    if (data) {
      setName(data.name);
      setCompany_name(data.company_name);
      setImage(data.thumbnail_url);
      setUser_info(data);
    }
  }, [data]);

  const Exit = () => {
    try {
      if (window['heap']) {
        window['heap'].resetIdentity();
      }
    } catch (error) {
      console.log("Em...I think heap isn't work correctly :/");
    }
    user.update_user_data(null);
    window['auth'] = null;
    window['complete_register'] = null;
    jsCookie.remove('first_name');
    jsCookie.remove('last_name');
    jsCookie.remove('company_name');
    jsCookie.remove('complete_register');
    jsCookie.remove('phone');
    jsCookie.remove('thumbnail_url');
    jsCookie.remove('token');
    jsCookie.remove('user_id');
    jsCookie.remove('name');
    jsCookie.remove('user_name');
    jsCookie.remove('username');
    jsCookie.remove('new_car');
    jsCookie.remove('car_info');
    localStorage.removeItem('red_dot');
    localStorage.removeItem('incompleteInfo');
    localStorage.removeItem('halfcompletecar');
    router.push('/');
  };

  return (
    <article
      className='Profile_info_container'
      dir={activeLanguage === 'fa' ? 'rtl' : 'ltr'}>
      {name ? (
        !edit ? (
          <>
            <div className='user_information'>
              {image.search('default') === -1 ? (
                <img
                  className='avatar_image'
                  src={image}
                  alt={name}
                  onClick={() => {
                    if (is_mine) {
                      setEdit(true), setTriggerUpload(true);
                    } else {
                      modalCTX.modalHandler('ImageModal', {
                        imageUrl: data.image_url
                      });
                    }
                  }}
                />
              ) : (
                <NameAvatar
                  name={company_name ? company_name : name}
                  css_display='inline-block'
                  css_with={48}
                  css_radius={50}
                  css_text_color='#ffffff'
                  arrayIndex={!is_mine ? data.id % 10 : null}
                  clickOnElement={() => {
                    if (is_mine) {
                      setEdit(true), setTriggerUpload(true);
                    }
                  }}
                />
              )}
              <div>
                <h3>{company_name ? company_name : name}</h3>
                {!is_mine ? (
                  <div className='user_info'>
                    <p className='since_from'>
                      {dynamicString(
                        [
                          dateSlicer(
                            activeLanguage,
                            data.join_date.name[activeLanguage]
                          )
                        ],
                        language.COMMON.member
                      )}
                    </p>
                    {data.no_of_successfully_rented_cars_as_owner > 0 ? (
                      <span className='margin_top_16 inline_block_container'>
                        {numberChanger(
                          dynamicString(
                            [data.no_of_successfully_rented_cars_as_owner],
                            language.COMMON.hostOfTrip
                          ),
                          activeLanguage
                        )}
                        {/* {language.mizban}{" "}
                        <strong>
                          {data.no_of_successfully_rented_cars_as_owner}
                          {language.safar}
                        </strong>{" "}
                        {language.bodeh} */}
                      </span>
                    ) : null}
                    {data.no_of_trips_gone > 0 ? (
                      <span className='margin_top_16 inline_block_container'>
                        {numberChanger(
                          dynamicString(
                            [data.no_of_trips_gone],
                            language.COMMON.hasTravel
                          ),
                          activeLanguage
                        )}
                        {/* <strong>
                          {data.no_of_trips_gone}
                          {language.safar}
                        </strong>{" "} */}
                      </span>
                    ) : null}
                    {data.owner_response_rate > 0 ? (
                      <p className='size_14 margin_top_16 margin_bottom_16'>
                        {numberChanger(
                          dynamicString(
                            [data.owner_response_rate],
                            language.COMMON.responseRate
                          ),
                          activeLanguage
                        )}
                        {/* به
                        <strong>
                          {" "}
                          {data.owner_response_rate}% درخواست‌ها{" "}
                        </strong>
                        پاسخ داده است. */}
                      </p>
                    ) : null}
                    {data.owner_avg_response_time ? (
                      <p className='size_14 margin_top_16 margin_bottom_16'>
                        {dynamicString(
                          [
                            data.owner_avg_response_time.total_seconds >= 86400
                              ? language.COMMON.moreOneDay
                              : data.owner_avg_response_time.name_i18n[
                                  activeLanguage
                                ]
                          ],
                          language.COMMON.responseTime
                        )}
                        {/* {language.mamoolan}
                        <strong>
                          {language.hodood}{" "}
                          {data.owner_avg_response_time.total_seconds >= 86400
                            ? language.more_than_one_day
                            : data.owner_avg_response_time.name}{" "}
                        </strong>
                        {language.pasokh} */}
                      </p>
                    ) : null}
                  </div>
                ) : null}
                {is_mine && (
                  <p onClick={() => setEdit(true)}>{language.USER.edit}</p>
                )}
              </div>
            </div>
            {is_mine && (
              <div className='profile_controls'>
                <div className='Exit' onClick={Exit}>
                  <Icon
                    name='logout'
                    height='20px'
                    width='20px'
                    color='#4ba3ce'
                  />
                  <p>{language.USER.exit}</p>
                </div>
                {activeLanguage === 'fa' && (
                  <Button
                    value={language.COMMON.addCar}
                    customClass='HEAP_Profile_Btn_AddCar'
                    click={() => {
                      router.push('/add-car');
                    }}
                    loading={false}
                  />
                )}
              </div>
            )}
          </>
        ) : (
          <Edit_profile
            language={language}
            data={user_info}
            triggerUpload={triggerUpload}
            setEdit={(reload) => {
              setEdit(!edit);
              setTriggerUpload(false);
              if (reload) {
                router.push('/');
              }
            }}
          />
        )
      ) : null}
    </article>
  );
};

interface IProfile_info {
  is_mine: boolean;
  data: any;
  language: any;
}

export default Profile_info;

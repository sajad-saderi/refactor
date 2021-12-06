import React, { useState, useContext, useEffect } from "react";
import Button from "../../../../components/form/Button";
import Modal_context from "../../../../context/Modal_context";
import languageCTX from "../../../../context/languageCTX";
// import "./Law.scss";
import staticPage from '../../../../../public/languages/static.json'

const Law = ({ language }) => {
  const [renter, setRenter] = useState(null);
  const MODAL_CONTEXT = useContext(Modal_context);
  const { activeLanguage } = useContext(languageCTX);

  return (
    <>
      <div className='modal_box_div'>
        <h2>{staticPage.ourPolicies.h1}</h2>
        <div className='LawsPart'>
          <div className='AboutUsPage'>
            <p>
              <strong>{staticPage.ourPolicies.p_1}</strong>
            </p>
            <h2>{staticPage.ourPolicies.h2_1}</h2>
            <h3>{staticPage.ourPolicies.h3_1}</h3>
            <ul>
              <li>{staticPage.ourPolicies.li_1}</li>
              <li>{staticPage.ourPolicies.li_2}</li>
            </ul>
            <h2>{staticPage.ourPolicies.h2_2}</h2>
            <ul>
              <li>{staticPage.ourPolicies.li_3}</li>
              <li>{staticPage.ourPolicies.li_4}</li>
              <li>{staticPage.ourPolicies.li_5}</li>
            </ul>
            <h3>{staticPage.ourPolicies.h3_2}</h3>
            <ul>
              <li>{staticPage.ourPolicies.li_6}</li>
              <li>{staticPage.ourPolicies.li_7}</li>
              <li>{staticPage.ourPolicies.li_8}</li>
              <li>{staticPage.ourPolicies.li_9}</li>
              <li>{staticPage.ourPolicies.li_10}</li>
              <li>{staticPage.ourPolicies.li_11}</li>
            </ul>
            <h2>{staticPage.ourPolicies.h2_3}</h2>
            <p>{staticPage.ourPolicies.p_2}</p>
            <h2>{staticPage.ourPolicies.h2_4}</h2>
            <ul>
              <li>{staticPage.ourPolicies.li_12}</li>
              <li>{staticPage.ourPolicies.li_13}</li>
            </ul>
            <h2>{staticPage.ourPolicies.h2_5}</h2>
            <ul>
              <li>{staticPage.ourPolicies.li_14}</li>
              <li>{staticPage.ourPolicies.li_15}</li>
              <li>{staticPage.ourPolicies.li_16}</li>
            </ul>
            <h2>{staticPage.ourPolicies.h2_6}</h2>
            <ul>
              <li>{staticPage.ourPolicies.li_17}</li>
              <li>{staticPage.ourPolicies.li_18}</li>
              <li>{staticPage.ourPolicies.li_19}</li>
              <li>{staticPage.ourPolicies.li_20}</li>
              <li>{staticPage.ourPolicies.li_21}</li>
              <li>{staticPage.ourPolicies.li_22}</li>
              <li>{staticPage.ourPolicies.li_23}</li>
              <li>{staticPage.ourPolicies.li_24}</li>
              <li>{staticPage.ourPolicies.li_25}</li>
              <li>{staticPage.ourPolicies.li_26}</li>
            </ul>
            <h2>{staticPage.ourPolicies.h2_7}</h2>
            <ul>
              <li>{staticPage.ourPolicies.li_27}</li>
              <li>{staticPage.ourPolicies.li_28}</li>
              <li>{staticPage.ourPolicies.li_29}</li>
              <li>{staticPage.ourPolicies.li_30}</li>
              <li>{staticPage.ourPolicies.li_31}</li>
              <li>{staticPage.ourPolicies.li_32}</li>
            </ul>
            <h2>{staticPage.ourPolicies.h2_8}</h2>
            <ul>
              <li>{staticPage.ourPolicies.li_33}</li>
              <li>{staticPage.ourPolicies.li_34}</li>
              <li>{staticPage.ourPolicies.li_35}</li>
              <li>{staticPage.ourPolicies.li_36}</li>
            </ul>
            <h2>{staticPage.ourPolicies.h2_9}</h2>
            <ul>
              <li>{staticPage.ourPolicies.li_37}</li>
              <li>{staticPage.ourPolicies.li_38}</li>
              <li>{staticPage.ourPolicies.li_39}</li>
              <li>{staticPage.ourPolicies.li_40}</li>
            </ul>
            <h2>{staticPage.ourPolicies.h2_10}</h2>
            <ul>
              <li>{staticPage.ourPolicies.li_41}</li>
              <li>{staticPage.ourPolicies.li_42}</li>
              <li>{staticPage.ourPolicies.li_43}</li>
              <li>{staticPage.ourPolicies.li_44}</li>
              <li>{staticPage.ourPolicies.li_45}</li>
              <li>{staticPage.ourPolicies.li_46}</li>
              <li>{staticPage.ourPolicies.li_47}</li>
              <li>{staticPage.ourPolicies.li_48}</li>
              <li>{staticPage.ourPolicies.li_49}</li>
              <li>{staticPage.ourPolicies.li_50}</li>
              <li>{staticPage.ourPolicies.li_51}</li>
            </ul>
            <p>{staticPage.ourPolicies.p_3}</p>
            <h3>{staticPage.ourPolicies.h3_3}</h3>
            <p>{staticPage.ourPolicies.p_4}</p>
            <h2>{staticPage.ourPolicies.h2_11}</h2>
            <p>{staticPage.ourPolicies.p_5}</p>
            <p>
              <strong>
                <u>{staticPage.ourPolicies.p_6}</u>
              </strong>
            </p>
            <h2>
              <u>{staticPage.ourPolicies.h2_12}</u>
            </h2>
            <p>{staticPage.ourPolicies.p_7}</p>
            <ul>
              <li>{staticPage.ourPolicies.li_52}</li>
              <li>{staticPage.ourPolicies.li_53}</li>
              <li>{staticPage.ourPolicies.li_54}</li>
              <li>{staticPage.ourPolicies.li_55}</li>
              <li>{staticPage.ourPolicies.li_56}</li>
            </ul>
            <h2>{staticPage.ourPolicies.h2_13}</h2>
            <p>{staticPage.ourPolicies.p_8}</p>
            <p>
              <strong>{staticPage.ourPolicies.p_9_strong} </strong>
              {staticPage.ourPolicies.p_9}
            </p>
            <p>
              <strong>{staticPage.ourPolicies.p_10_strong} </strong>
              {staticPage.ourPolicies.p_10}
            </p>
            <p>
              <strong>{staticPage.ourPolicies.p_11_strong} </strong>
              {staticPage.ourPolicies.p_11}
            </p>
            <p>
              <strong>{staticPage.ourPolicies.p_12_strong} </strong>
              {staticPage.ourPolicies.p_12}
            </p>
            <p>
              <strong>{staticPage.ourPolicies.p_13_strong} </strong>
              {staticPage.ourPolicies.p_13}
            </p>
            <p>
              <strong>{staticPage.ourPolicies.p_14_strong} </strong>
              {staticPage.ourPolicies.p_14}
            </p>
            <p>
              <strong>{staticPage.ourPolicies.p_15_strong} </strong>
              {staticPage.ourPolicies.p_15}
            </p>
            <h2>
              <u>{staticPage.ourPolicies.h2_14}</u>
            </h2>
            <h3>{staticPage.ourPolicies.h3_4}</h3>
            <p>{staticPage.ourPolicies.p_16}</p>
            <ul>
              <li>{staticPage.ourPolicies.li_57}</li>
              <li>{staticPage.ourPolicies.li_58}</li>
              <li>{staticPage.ourPolicies.li_59}</li>
              <li>{staticPage.ourPolicies.li_60}</li>
              <li>{staticPage.ourPolicies.li_61}</li>
            </ul>
            <h3>{staticPage.ourPolicies.h3_5}</h3>
            <p>{staticPage.ourPolicies.p_17}</p>
            <h2>
              <u>{staticPage.ourPolicies.h2_15}</u>
            </h2>
            <h3>{staticPage.ourPolicies.h3_6}</h3>
            <p>{staticPage.ourPolicies.p_18}</p>
            <ul>
              <li>{staticPage.ourPolicies.li_62}</li>
              <li>{staticPage.ourPolicies.li_63}</li>
              <li>{staticPage.ourPolicies.li_64}</li>
              <li>{staticPage.ourPolicies.li_65}</li>
              <li>{staticPage.ourPolicies.li_66}</li>
              <li>{staticPage.ourPolicies.li_67}</li>
            </ul>
            <h3>{staticPage.ourPolicies.h3_7}</h3>
            <p>{staticPage.ourPolicies.p_19}</p>
            <ul>
              <li>{staticPage.ourPolicies.li_68}</li>
              <li>{staticPage.ourPolicies.li_69}</li>
              <li>{staticPage.ourPolicies.li_70}</li>
              <li>{staticPage.ourPolicies.li_71}</li>
              <li>{staticPage.ourPolicies.li_72}</li>
              <li>{staticPage.ourPolicies.li_73}</li>
              <li>{staticPage.ourPolicies.li_74}</li>
              <li>{staticPage.ourPolicies.li_75}</li>
              <li>{staticPage.ourPolicies.li_76}</li>
            </ul>
            <h2>
              <u>{staticPage.ourPolicies.h2_16}</u>
            </h2>
            <h3>{staticPage.ourPolicies.h3_8}</h3>
            <p>{staticPage.ourPolicies.p_20}</p>
            <h3>{staticPage.ourPolicies.h3_9}</h3>
            <p>{staticPage.ourPolicies.p_21}</p>
            <h3>{staticPage.ourPolicies.h3_10}</h3>
            <p>{staticPage.ourPolicies.p_22}</p>
            <h2>{staticPage.ourPolicies.h2_17}</h2>
            <p>{staticPage.ourPolicies.p_23}</p>
            <h2>{staticPage.ourPolicies.h2_18}</h2>
            <p>{staticPage.ourPolicies.p_24}</p>
            <h2>{staticPage.ourPolicies.h2_19}</h2>
            <p>{staticPage.ourPolicies.p_25}</p>
            <h2>
              <u>{staticPage.ourPolicies.h2_20}</u>
            </h2>
            <h3>{staticPage.ourPolicies.h3_11}</h3>
            <p>{staticPage.ourPolicies.p_26}</p>
            <h4>{staticPage.ourPolicies.h4_1}</h4>
            <ul>
              <li>{staticPage.ourPolicies.li_77}</li>
              <li>{staticPage.ourPolicies.li_78}</li>
              <li>{staticPage.ourPolicies.li_79}</li>
            </ul>
            <h4>{staticPage.ourPolicies.h4_2}</h4>
            <ul>
              <li>{staticPage.ourPolicies.li_80}</li>
              <li>{staticPage.ourPolicies.li_81}</li>
            </ul>
            <h4>{staticPage.ourPolicies.h4_3}</h4>
            <p>{staticPage.ourPolicies.p_27}</p>
            <h2>{staticPage.ourPolicies.h2_21}</h2>
            <h3>{staticPage.ourPolicies.h3_12}</h3>
            <p>{staticPage.ourPolicies.p_28}</p>
            <h3>{staticPage.ourPolicies.h3_13}</h3>
            <p>{staticPage.ourPolicies.p_29}</p>
            <p>
              <strong>{staticPage.ourPolicies.p_30_strong} </strong>
              {staticPage.ourPolicies.p_30}
            </p>
            <p>
              <strong>{staticPage.ourPolicies.p_31_strong} </strong>
              {staticPage.ourPolicies.p_31}
            </p>
            <p>
              <strong>{staticPage.ourPolicies.p_32_strong} </strong>
              {staticPage.ourPolicies.p_32}
            </p>
            <p>
              <strong>{staticPage.ourPolicies.p_33_strong} </strong>
              {staticPage.ourPolicies.p_33}
            </p>

            <h3>{staticPage.ourPolicies.h3_14}</h3>
            <p>{staticPage.ourPolicies.p_34}</p>
            <h2>
              <u>{staticPage.ourPolicies.h2_22}</u>
            </h2>
            <p>{staticPage.ourPolicies.p_35}</p>
            <p>
              <strong>{staticPage.ourPolicies.p_36_strong} </strong>
              {staticPage.ourPolicies.p_36}
            </p>
            <p>
              <u>
                <strong>{staticPage.ourPolicies.p_37_strong} </strong>
                {staticPage.ourPolicies.p_37}
              </u>
            </p>
            <h2>
              <u>{staticPage.ourPolicies.h2_23}</u>
            </h2>
            <h3>{staticPage.ourPolicies.h3_15}</h3>
            <p>{staticPage.ourPolicies.p_38}</p>
            <h3>{staticPage.ourPolicies.h3_16}</h3>
            <p>{staticPage.ourPolicies.p_39}</p>
            <h3>{staticPage.ourPolicies.h3_17}</h3>
            <p>{staticPage.ourPolicies.p_40}</p>
            <h3>{staticPage.ourPolicies.h3_18}</h3>
            <p>{staticPage.ourPolicies.p_41}</p>

            <h2>{staticPage.ourPolicies.h2_24}</h2>
            <h3>{staticPage.ourPolicies.h3_19}</h3>
            <p>
              <strong>{staticPage.ourPolicies.p_42_strong} </strong>
              {staticPage.ourPolicies.p_42}
            </p>
            <h2>{staticPage.ourPolicies.h2_25}</h2>
            <ul>
              <li>
                <strong>{staticPage.ourPolicies.li_82}</strong>
              </li>
              <p className="intends">{staticPage.ourPolicies.p_43}</p>
              <li>
                <strong>{staticPage.ourPolicies.li_83} </strong>
              </li>
              <ul className="intends">
                <li>{staticPage.ourPolicies.li_84}</li>
                <li>{staticPage.ourPolicies.li_85}</li>
                <li>{staticPage.ourPolicies.li_86}</li>
                <li>{staticPage.ourPolicies.li_87}</li>
                <li>{staticPage.ourPolicies.li_88}</li>
                <li>{staticPage.ourPolicies.li_89}</li>
                <li>{staticPage.ourPolicies.li_90}</li>
                <li>{staticPage.ourPolicies.li_91}</li>
                <li>{staticPage.ourPolicies.li_92}</li>
              </ul>

              <p>
                <strong>{staticPage.ourPolicies.p_44_strong} </strong>
                {staticPage.ourPolicies.p_44}
              </p>
              <p>
                <strong>{staticPage.ourPolicies.p_45_strong} </strong>
                {staticPage.ourPolicies.p_45}
              </p>
              <p>{staticPage.ourPolicies.p_46}</p>
              <p>
                <strong>{staticPage.ourPolicies.p_47_strong} </strong>
                {staticPage.ourPolicies.p_47}
              </p>
              <li>
                <strong>{staticPage.ourPolicies.li_93}</strong>
              </li>
              <p>{staticPage.ourPolicies.p_48}</p>
              <li>
                <strong>{staticPage.ourPolicies.li_94}</strong>
              </li>
              <p>{staticPage.ourPolicies.p_49}</p>
              <ul className="intends">
                <li>{staticPage.ourPolicies.li_95}</li>
                <li>{staticPage.ourPolicies.li_96}</li>
              </ul>
              <p>
                <strong>{staticPage.ourPolicies.p_50_strong} </strong>
                {staticPage.ourPolicies.p_50}
              </p>
              <li>
                <strong>{staticPage.ourPolicies.li_97}</strong>
              </li>
              <p>{staticPage.ourPolicies.p_51}</p>
              <li>
                <u>
                  <strong>{staticPage.ourPolicies.li_98}</strong>
                </u>
              </li>
              <p>{staticPage.ourPolicies.p_52}</p>
              <li>
                <strong>{staticPage.ourPolicies.li_99}</strong>
              </li>
              <p>{staticPage.ourPolicies.p_53}</p>
              <p>{staticPage.ourPolicies.p_54}</p>
              <p>{staticPage.ourPolicies.p_55}</p>
              <p>{staticPage.ourPolicies.p_56}</p>
            </ul>
            <h2>{staticPage.ourPolicies.h2_26}</h2>
            <p>{staticPage.ourPolicies.p_57}</p>
            <p>{staticPage.ourPolicies.p_58}</p>
            <h2>{staticPage.ourPolicies.h2_27}</h2>
            <p>{staticPage.ourPolicies.p_59}</p>
            <ul className="intends">
              <li>{staticPage.ourPolicies.li_100}</li>
              <li>{staticPage.ourPolicies.li_101}</li>
              <li>{staticPage.ourPolicies.li_102}</li>
              <li>{staticPage.ourPolicies.li_103}</li>
              <li>{staticPage.ourPolicies.li_104}</li>
              <li>{staticPage.ourPolicies.li_105}</li>
            </ul>
            <h2>{staticPage.ourPolicies.h2_28}</h2>
            <p>{staticPage.ourPolicies.p_60}</p>
            <p>{staticPage.ourPolicies.p_61}</p>
            <h2>{staticPage.ourPolicies.h2_29}</h2>
            <ul>
              <li>{staticPage.ourPolicies.li_106}</li>
              <li>{staticPage.ourPolicies.li_107}</li>
              <li>{staticPage.ourPolicies.li_108}</li>
              <li>{staticPage.ourPolicies.li_109}</li>
              <li>{staticPage.ourPolicies.li_110}</li>
            </ul>
            <h2>{staticPage.ourPolicies.h2_30}</h2>
            <p>{staticPage.ourPolicies.p_64}</p>
            <h2>{staticPage.ourPolicies.h2_31}</h2>
            <p>{staticPage.ourPolicies.p_65}</p>
            <h2>{staticPage.ourPolicies.h2_32}</h2>
            <p>{staticPage.ourPolicies.p_66}</p>
            <ul>
              <li>{staticPage.ourPolicies.li_111}</li>
              <li>{staticPage.ourPolicies.li_112}</li>
              <li>{staticPage.ourPolicies.li_113}</li>
              <li>{staticPage.ourPolicies.li_114}</li>
              <li>{staticPage.ourPolicies.li_115}</li>
            </ul>
            <h2>{staticPage.ourPolicies.h2_33}</h2>
            <p>{staticPage.ourPolicies.p_67}</p>
            <p>{staticPage.ourPolicies.p_68}</p>
            <h2>{staticPage.ourPolicies.h2_34}</h2>
            <p>{staticPage.ourPolicies.p_69}</p>
            <h2>{staticPage.ourPolicies.h2_35}</h2>
            <p>{staticPage.ourPolicies.p_70}</p>
            <p>{staticPage.ourPolicies.p_71}</p>
            <h2>{staticPage.ourPolicies.h2_36}</h2>
            <p>{staticPage.ourPolicies.p_73}</p>
            <h2>{staticPage.ourPolicies.h2_37}</h2>
            <p>{staticPage.ourPolicies.p_72}</p>
            <h2>{staticPage.ourPolicies.h2_38}</h2>
            <p>{staticPage.ourPolicies.p_74}</p>
            <h2>{staticPage.ourPolicies.h2_39}</h2>
            <h3>{staticPage.ourPolicies.h3_21}</h3>
            <p>{staticPage.ourPolicies.p_75}</p>
            <h3>{staticPage.ourPolicies.h3_20}</h3>
            <ul>
              <li>{staticPage.ourPolicies.li_118}</li>
              <li>{staticPage.ourPolicies.li_119}</li>
              <li>{staticPage.ourPolicies.li_120}</li>
              <li>{staticPage.ourPolicies.li_121}</li>
              <li>{staticPage.ourPolicies.li_122}</li>
              <li>{staticPage.ourPolicies.li_123}</li>
              <li>{staticPage.ourPolicies.li_124}</li>
              <li>{staticPage.ourPolicies.li_125}</li>
              <li>{staticPage.ourPolicies.li_126}</li>
            </ul>
            <h3>{staticPage.ourPolicies.h3_22}</h3>
            <ul>
              <li>{staticPage.ourPolicies.li_127}</li>
              <li>{staticPage.ourPolicies.li_128}</li>
              <li>{staticPage.ourPolicies.li_129}</li>
              <li>{staticPage.ourPolicies.li_130}</li>
              <li>{staticPage.ourPolicies.li_131}</li>
            </ul>
            <h3>{staticPage.ourPolicies.h3_23}</h3>
            <p>{staticPage.ourPolicies.li_116}</p>
            <h3>{staticPage.ourPolicies.h3_24}</h3>
            <p>{staticPage.ourPolicies.li_117}</p>
            <h2>{staticPage.ourPolicies.h2_40}</h2>
            <p>{staticPage.ourPolicies.p_76}</p>
            <h3>{staticPage.ourPolicies.h3_25}</h3>
            <p>{staticPage.ourPolicies.p_77}</p>
            <h3>{staticPage.ourPolicies.h3_26}</h3>
            <ul>
              <li>{staticPage.ourPolicies.li_132}</li>
              <li>{staticPage.ourPolicies.li_133}</li>
              <li>{staticPage.ourPolicies.li_134}</li>
            </ul>
            <h3>{staticPage.ourPolicies.h3_27}</h3>
            <p>{staticPage.ourPolicies.p_78}</p>
            <h3>{staticPage.ourPolicies.h3_28}</h3>
            <ul>
              <li>{staticPage.ourPolicies.li_135}</li>
              <li>{staticPage.ourPolicies.li_136}</li>
              <li>{staticPage.ourPolicies.li_137}</li>
              <li>{staticPage.ourPolicies.li_138}</li>
              <li>{staticPage.ourPolicies.li_139}</li>
            </ul>
            <h3>{staticPage.ourPolicies.h3_29}</h3>
            <ul>
              <li>{staticPage.ourPolicies.li_140}</li>
              <li>{staticPage.ourPolicies.li_141}</li>
            </ul>
            <h3>{staticPage.ourPolicies.h3_30}</h3>
            <p>{staticPage.ourPolicies.p_79}</p>
            <h3>{staticPage.ourPolicies.h3_31}</h3>
            <p>{staticPage.ourPolicies.p_80}</p>
            <ul>
              <li>{staticPage.ourPolicies.li_142}</li>
              <li>{staticPage.ourPolicies.li_143}</li>
              <li>{staticPage.ourPolicies.li_144}</li>
              <li>{staticPage.ourPolicies.li_145}</li>
              <li>{staticPage.ourPolicies.li_146}</li>
            </ul>
          </div>
        </div>
        <Button
          value={language.COMMON.iAgree}
          class='Blue_BTN local_Style HEAP_ModalLaws_Btn_Accept'
          loading={false}
          // close the modal
          click={() => MODAL_CONTEXT.modalHandler()}
        />
      </div>
    </>
  );
};


export default Law;

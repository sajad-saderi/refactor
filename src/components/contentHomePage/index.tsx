import insurance from '../../../public/image/SamanInsurance.png';
import Recommendation_section_owl from '../recommendation_section/recommendation_section_owl';
import Link from 'next/link';
import languageCTX from '../../context/languageCTX'
import { useContext } from 'react';

const ContentHomePage = ({
  auth,
  differentStyle,
  extraContent,
  abTest,
  language,
}: IContentHomePage) => {
  const { activeLanguage } = useContext(languageCTX)
  return (
    <div className="responsive second_part_container">
      <div
        className={['insuranceBox', differentStyle ? 'marginFromTop' : ''].join(
          ' ',
        )}
      >
        <p>{language.INFORMATION.text1}</p>
        <img src={insurance} alt={language.COMMON.samanInsuranceImage} width="115" height="47" />
      </div>
      <div className="second_container">
        <h2>{language.INFORMATION.text2}</h2>
        <div className="full_width">
          <p>{language.INFORMATION.text3}</p>
        </div>
        {language === 'fa' && <>
          <h2>{language.INFORMATION.text4}</h2>
          <div className="three_columns">
            <section>
              <h3>{language.INFORMATION.text5}</h3>
              <p>{language.INFORMATION.text6}</p>
            </section>
            <section>
              <h3>{language.INFORMATION.text29}</h3>
              <p>
                {language.INFORMATION.text30}
              </p>
            </section>
            <section>
              <h3>{language.INFORMATION.text7}</h3>
              <p>{language.INFORMATION.text8}</p>
            </section>
          </div>
        </>
        }
        <Recommendation_section_owl />
        <h2>{language.INFORMATION.text11}</h2>
        <div className="three_columns">
          <section>
            <h3>{language.INFORMATION.text12}</h3>
            <p>{language.INFORMATION.text13}</p>
          </section>
          <section>
            <h3>{language.INFORMATION.text14}</h3>
            <p>{language.INFORMATION.text15}</p>
          </section>
          <section>
            <h3>{language.INFORMATION.text16}</h3>
            <p>{language.INFORMATION.text17}</p>
          </section>
        </div>
        {activeLanguage === 'fa' &&
          <div
            className="add_car_section"
            onClickCapture={() => {
              if (!auth) {
                localStorage['last_location'] = '/add-car';
              }
            }}
          >
            <Link href="/join-us" prefetch={false}>
              <a className="Blue_BTN add_car_custom">
                {language.COMMON.goToJoinUs}
              </a>
            </Link>
            <Link href="/add-car" prefetch={false}>
              <a>{language.COMMON.addYourCar}</a>
            </Link>
            {extraContent && extraContent}
          </div>
        }
      </div>
    </div>
  );
}

interface IContentHomePage {
  auth: boolean;
  differentStyle?: boolean;
  extraContent?: any;
  abTest?: boolean;
  language: any;
}

export default ContentHomePage;

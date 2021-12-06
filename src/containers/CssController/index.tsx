import React, { ReactNode } from 'react';
import { directionDetector } from '../../helpers/directionDitector';
import { supportedLanguages } from '../../../utils/types';

interface CssController {
  children?: ReactNode;
  locale: supportedLanguages;
}

const CssController: React.FC<CssController> = ({
  children,
  locale,
}): JSX.Element => <div dir={directionDetector(locale)}>{children}</div>;

export default CssController;

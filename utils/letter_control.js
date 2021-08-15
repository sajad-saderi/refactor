import al_q from "../public/fonts/svg alphabet/english/q.svg";
import al_w from "../public/fonts/svg alphabet/english/w.svg";
import al_e from "../public/fonts/svg alphabet/english/e.svg";
import al_r from "../public/fonts/svg alphabet/english/r.svg";
import al_t from "../public/fonts/svg alphabet/english/t.svg";
import al_y from "../public/fonts/svg alphabet/english/y.svg";
import al_u from "../public/fonts/svg alphabet/english/u.svg";
import al_i from "../public/fonts/svg alphabet/english/i.svg";
import al_o from "../public/fonts/svg alphabet/english/o.svg";
import al_p from "../public/fonts/svg alphabet/english/p.svg";
import al_a from "../public/fonts/svg alphabet/english/a.svg";
import al_b from "../public/fonts/svg alphabet/english/b.svg";
import al_s from "../public/fonts/svg alphabet/english/s.svg";
import al_d from "../public/fonts/svg alphabet/english/d.svg";
import al_f from "../public/fonts/svg alphabet/english/f.svg";
import al_g from "../public/fonts/svg alphabet/english/g.svg";
import al_h from "../public/fonts/svg alphabet/english/h.svg";
import al_j from "../public/fonts/svg alphabet/english/j.svg";
import al_k from "../public/fonts/svg alphabet/english/k.svg";
import al_l from "../public/fonts/svg alphabet/english/l.svg";
import al_z from "../public/fonts/svg alphabet/english/z.svg";
import al_x from "../public/fonts/svg alphabet/english/x.svg";
import al_c from "../public/fonts/svg alphabet/english/c.svg";
import al_v from "../public/fonts/svg alphabet/english/v.svg";
import al_n from "../public/fonts/svg alphabet/english/n.svg";
import al_m from "../public/fonts/svg alphabet/english/m.svg";

import aaa from "../public/fonts/svg alphabet/persian/aaa.svg";
import aleph from "../public/fonts/svg alphabet/persian/aleph.svg";
import b from "../public/fonts/svg alphabet/persian/b.svg";
import d from "../public/fonts/svg alphabet/persian/d.svg";
import dz from "../public/fonts/svg alphabet/persian/dz.svg";
import eyn from "../public/fonts/svg alphabet/persian/eyn.svg";
import gaaf from "../public/fonts/svg alphabet/persian/gaaf.svg";
import gh from "../public/fonts/svg alphabet/persian/gh.svg";
import gheyn from "../public/fonts/svg alphabet/persian/gheyn.svg";
import ch from "../public/fonts/svg alphabet/persian/ch.svg";
import hgerd from "../public/fonts/svg alphabet/persian/hgerd.svg";
import hh from "../public/fonts/svg alphabet/persian/hh.svg";
import j from "../public/fonts/svg alphabet/persian/j.svg";
import kaaf from "../public/fonts/svg alphabet/persian/kaaf.svg";
import kh from "../public/fonts/svg alphabet/persian/kh.svg";
import laam from "../public/fonts/svg alphabet/persian/laam.svg";
import mim from "../public/fonts/svg alphabet/persian/mim.svg";
import non from "../public/fonts/svg alphabet/persian/non.svg";
import p from "../public/fonts/svg alphabet/persian/p.svg";
import r from "../public/fonts/svg alphabet/persian/r.svg";
import rz from "../public/fonts/svg alphabet/persian/rz.svg";
import shin from "../public/fonts/svg alphabet/persian/shin.svg";
import t from "../public/fonts/svg alphabet/persian/t.svg";
import tdasteh from "../public/fonts/svg alphabet/persian/tdasteh.svg";
import tz from "../public/fonts/svg alphabet/persian/tz.svg";
import v from "../public/fonts/svg alphabet/persian/v.svg";
import yee from "../public/fonts/svg alphabet/persian/yee.svg";
import zaad from "../public/fonts/svg alphabet/persian/zaad.svg";
import zh from "../public/fonts/svg alphabet/persian/zh.svg";
import f from "../public/fonts/svg alphabet/persian/f.svg";
import saad from "../public/fonts/svg alphabet/persian/saad.svg";
import se from "../public/fonts/svg alphabet/persian/se.svg";
import seen from "../public/fonts/svg alphabet/persian/seen.svg";

export const letter_control = (word) => {
  const firstLetterOfWord = word.slice(0, 1).toUpperCase();
  if (/^[A-Z]*$/.test(firstLetterOfWord)) {
    return {
      language: "en",
      src: findSvgForEnChar(firstLetterOfWord),
    };
  } else if (/^[\u0600-\u06FF\s]+$/.test(firstLetterOfWord)) {
    return {
      language: "fa",
      src: findSvgForFaChar(firstLetterOfWord),
    };
  }
};

const findSvgForEnChar = (letter) => {
  let svgAddress = null;
  switch (letter) {
    case "Q":
      svgAddress = al_q;
      break;
    case "W":
      svgAddress = al_w;
      break;
    case "E":
      svgAddress = al_e;
      break;
    case "R":
      svgAddress = al_r;
      break;
    case "T":
      svgAddress = al_t;
      break;
    case "Y":
      svgAddress = al_y;
      break;
    case "U":
      svgAddress = al_u;
      break;
    case "I":
      svgAddress = al_i;
      break;
    case "O":
      svgAddress = al_o;
      break;
    case "P":
      svgAddress = al_p;
      break;
    case "A":
      svgAddress = al_a;
      break;
    case "S":
      svgAddress = al_s;
      break;
    case "D":
      svgAddress = al_d;
      break;
    case "F":
      svgAddress = al_f;
      break;
    case "G":
      svgAddress = al_g;
      break;
    case "H":
      svgAddress = al_h;
      break;
    case "J":
      svgAddress = al_j;
      break;
    case "K":
      svgAddress = al_k;
      break;
    case "L":
      svgAddress = al_l;
      break;
    case "Z":
      svgAddress = al_z;
      break;
    case "X":
      svgAddress = al_x;
      break;
    case "C":
      svgAddress = al_c;
      break;
    case "V":
      svgAddress = al_v;
      break;
    case "B":
      svgAddress = al_b;
      break;
    case "N":
      svgAddress = al_n;
      break;
    case "M":
      svgAddress = al_m;
      break;
    default:
      letter = aaa;
      break;
  }
  return svgAddress;
};

const findSvgForFaChar = (letter) => {
  let svgAddress = null;
  switch (letter) {
    case "ا":
      svgAddress = aaa;
      break;
    case "آ":
      svgAddress = aleph;
      break;
    case "ب":
      svgAddress = b;
      break;
    case "د":
      svgAddress = d;
      break;
    case "ذ":
      svgAddress = dz;
      break;
    case "ع":
      svgAddress = eyn;
      break;
    case "گ":
      svgAddress = gaaf;
      break;
    case "ق":
      svgAddress = gh;
      break;
    case "غ":
      svgAddress = gheyn;
      break;
    case "چ":
      svgAddress = ch;
      break;
    case "ه":
      svgAddress = hgerd;
      break;
    case "ح":
      svgAddress = hh;
      break;
    case "ج":
      svgAddress = j;
      break;
    case "ک":
      svgAddress = kaaf;
      break;
    case "خ":
      svgAddress = kh;
      break;
    case "ل":
      svgAddress = laam;
      break;
    case "م":
      svgAddress = mim;
      break;
    case "ن":
      svgAddress = non;
      break;
    case "پ":
      svgAddress = p;
      break;
    case "ر":
      svgAddress = r;
      break;
    case "ز":
      svgAddress = rz;
      break;
    case "ش":
      svgAddress = shin;
      break;
    case "ت":
      svgAddress = t;
      break;
    case "ط":
      svgAddress = tdasteh;
      break;
    case "ظ":
      svgAddress = tz;
      break;
    case "و":
      svgAddress = v;
      break;
    case "ی":
      svgAddress = yee;
      break;
    case "ض":
      svgAddress = zaad;
      break;
    case "ژ":
      svgAddress = zh;
      break;
    case "ف":
      svgAddress = f;
      break;
    case "ص":
      svgAddress = saad;
      break;
    case "ث":
      svgAddress = se;
      break;
    case "س":
      svgAddress = seen;
      break;
    default:
      letter = aaa;
      break;
  }
  return svgAddress;
};

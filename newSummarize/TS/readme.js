/*
- TypeScript
  - TS是JS的超集，它在JS语法的基础上扩展了对类的支持
  - 也就是说TS文件不只是用来声明类的，还是用来写JS逻辑的，对类的支持只是它的一个功能而已

- 迁移方式
  - 渐近迁移
    - 主要策略就是下面两个结合：
      - "allowJs": true, // 允许编译js文件，所有被用到的类型不确定的都是any
        "checkJs": false, // JS文件不报错
      - 给js后缀文件生成同名的d.ts【模块】声明文件
      - 新增文件用TS来写
    - 其它的一些说明：
    - 给js后缀文件生成同名的d.ts【模块】声明文件，必须是模块：export declare const xx:XX
      - import {} from './a'; 会去找a.ts文件是否存在，不存在就去找同名的模块声明文件a.d.ts
    - 新建model目录，把用到的类型分文件添加上，用到什么加什么【模块】
    - 添加global.d.ts声明文件，对一些全局方法添加声明

- 手动编译ts文件
  - npm install -g typescript
  - tsc hello.ts

- webpack配置相关
  - 两种编译方式
    - babel-loader
      - 添加 @babel/preset-typescript 和 @babel/preset-react 的plugin配置
    - ts-loader
      - 添加 "jsx": "react-jsx" 对react支持
  - tsconfig.json 文件相关
    {
        "compilerOptions": {
            "target": "es5", // 最终生成的js格式
            "lib": [ // libs.d.ts 中包含哪些全局类型声明的库文件
                "dom",
                "dom.iterable",
                "esnext"
            ],
            "allowJs": true, // 允许编译js文件，会把js当ts文件来编译
            "checkJs": false, // JS文件不报错，通常与allowJS一起使用
            "jsx": "react" // 把jsx语法输出为 React.createElement()
            "noEmit": true, // 不输出文件，只检测类型
            "module": "esnext", // 生成代码的模板标准
        },
        "include": [ // 编译目录
            "src"
        ],
        "exclude": ["node_modules", "build"] // 避免检查类型的文件
    }
  - .eslintrc.js文件
    - module.exports =  {
        parser:  '@typescript-eslint/parser',  // 指定ESLint解析器
        extends:  [
            'plugin:react/recommended',  //  从@eslint-plugin-react推荐规则
            'plugin:@typescript-eslint/recommended',  // 使用@typescript-eslint/eslint-plugin推荐的规则
        ],
        parserOptions:  {
            ecmaVersion:  2018,  // 允许解析现代ECMAScript特性
            sourceType:  'module',  // 允许使用 imports 导入
            ecmaFeatures:  {
            jsx:  true,  // 语序解析JSX
            },
        },
        rules:  {
            // 指定ESLint规则的位置。可以用来覆盖从扩展的配置中指定的规则。
            // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        },
    };

- 导入非JS资源的配置
  - 创建 global.d.ts
  - 添加 css 文件支持
    - declare module "*.css" {
        const content: string;
        export default content;
      }

- declare namespace Xyz {} - 声明一个全局命名空间，跟JS的变量命名空间
- declare module Xyz {} - 一种声明模块的方式，跟export声明的模块一样
- 模块概念：https://www.tslang.cn/docs/handbook/modules.html#ambient-modules

- declare（声明）
  - 告诉TS编译器你担保这些变量和模块存在，并声明了相应类型，编译的时候不需要提示错误！
  - 它只是通知编译器某个类型是存在的，不用也不能给出具体实现，
  - 可以用来描述：
    - 全局模块：declare module 'AA' { }
    - 全局命名空间： declare namespace API { }
    - 全局变量：declaree var wx: WX; 
    - 全局函数：declare function fn(): void;
    - 全局类：declare type Abc = boolean;
    - 全局枚举类：declare enum Xyz = {};
  - 参考：https://wangdoc.com/typescript/declare

- xx.d.ts (d即declare) 声明文件
  - .d.ts 文件中的顶级声明必须以 "declare" 或 "export" 修饰符开头
  - .d.ts文件顶级声明declare最好不要跟export同级使用，不然在其他ts引用这个.d.ts的内容的时候，就需要手动import导入了
  - .d.ts文件里如果顶级声明不用export的话，declare和直接写type、interface效果是一样的，在其他地方都可以直接引用

- declare global {}
  - 在模块文件中可以使用它来进行全局声明，所以必须出现在模块中
  - .d.ts文件中默认声明的就是全局的，不用加global

- TS的模块文件
  - TS模块必须要至少有一个 export 才能成为模块文件
  - TS模块跟ES模块一样，只是支持了导出类型
  - 编写模块：
    - export type Cat = { breed: string; yearOfBirth: number };
      export interface Dog {
        breeds: string[];
        yearOfBirth: number;
      }
      export const say = () => { // do something }
  - 导入模块语法：
    - import type { Cat, Dog } from "./animal.ts";
    - import { say, type Cat, type Dog } from "./animal.ts";

- /// <reference path="..." />
  /// <reference types="..." />
  - 用于【声明文件】之间的依赖声明

- lib.d.ts
  - 当你安装 TypeScript 时，会顺带安装一个 lib.d.ts 声明文件。
    这个文件包含 JavaScript 运行时以及 DOM 中存在各种常见的环境声明。
  - 它自动包含在 TypeScript 项目的编译上下文中；
  - 在项目中添加的所有xx.d.ts声明文件中的内容都将会和lib.d.ts进行合并

- TS模块查找顺序(模块解析)
  - 在 TypeScript 里，一个模块名可能对应一个.ts/.tsx或.d.ts文件（开启--allowJs的话，还可能对应.js/.jsx文件）
  - 相对路径的查询顺序：
    - 先尝试寻找模块对应的文件（.ts/.tsx）
    - 然后再寻找模块声明（.d.ts）
  - 非相对路径需要用到外部模块声明(.d.ts）：declare module 'moduleA' {}
  - 参考：https://www.tslang.cn/docs/handbook/module-resolution.html

- 给第三方库添加d.ts类型声明
  - 新建一个type目录或其它目录用来存放第三方的类型声明
  - 在文件中用module来定义对应的第三方库中的模块
    - declare module "path" {
        export function normalize(p: string): string;
        export let sep: string;
      }
  - 引入：import { normalize } from 'path'

- 常用语法
  - any、unknown、never、void的区别
    - any 是任意类型，具有所有类型的行为，可被执行，可访问属性，超脱于类型系统之外。
    - unknown 则是类型更安全的 any，同样可以将任何类型赋给它，但不能执行任何操作，必须用类型断言来显示说明类型才能去执行操作。
    - never 是无法观测的类型，不能进行任何操作，比如不会执行完的函数的返回值，合并结果不存在的交叉类型。在类型编程中非常活跃，常用于丢弃一些子类型。
    - void 就比较简单，只是代表函数没有返回值，没有其他的场景了。
    - 参考：https://cloud.tencent.com/developer/article/2197370
  - 类型扩展（也叫交叉类型）
    - interface
      - interface Bear extends Animal {
          honey: boolean
        }
    - type
      - type Bear = Animal & { 
          honey: Boolean 
        }
  - 或类型，也叫兼容类型
    - type Abc = Xyz | Efg
  - 类型断言
    - const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement
    - .tsx 文件中也可以：const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas")
    - 非空断言：const x = obj!.value
  - 明确类型的断言
    - const x = "hello" as unkown as number
  - 类型自动推断
    - Type Get = "GET" // 这叫：字面量类型
    - const xx = "GET" // xx只会被自动推断为string类型，不会推断为Get类型
  - 字面量类型（literal type）
    - Type Get = "GET"
    - const req = { url: "https://example.com", method: "GET" } as const;
      - req对象中的所有属性都被转换为它本身的字面量类型
    - let point = [3, 4] as const;
  - 类型守护（type guards）
    - 在针对类型不明确的时候可以用 typeof 类明确，比如：
    - function printAll(strs: string | string[] | null) {
        if (typeof strs === "object") {
            console.log(strs);
        } else if (typeof strs === "string") {
            console.log(strs);
        } else {
            // do nothing
        }
      }
    - 自定义类型守护函数，方便更好的做类型守护判断逻辑
      - function isFish(pet: Fish | Bird): pet is Fish {
          return (pet as Fish).swim !== undefined;
        }
  - 泛型（作用：针对不同类型数据，方便复用同一套逻辑）
    - 函数
      - function fn1<Type>(paramA: Type): Type[] {
           return Type[];
        }
      - function fn2<InputType1, InputType2, OutType>(input1: InputType1, input2: InputType2): OutType {
           return xx as OuptType;
        }
    - interface
      - interface Box<Type> {
           contents: Type;
        }
        let boxA: Box<string> = { contents: "hello" };
      - interface Array<Type> {
            length: number;
            pop(): Type | undefined;
            push(...items: Type[]): number;
        }
    - type
      - type OptionsFlags<Type> = {
            xx: Type;
        };
  - 函数剩余参数（Rest Parameters）
    - function multiply(n: number, ...m: number[]) {
        return m.map((x) => n * x);
      }
  - interface的一些使用方法
    - interface SquareConfig {
        color?: string;
        width?: number;
        [propName: string]: any;
      }
  - Types from Types
    - keyof
      - type Point = { x: number; y: number };
        type P = keyof Point;
    - typeof
      - let s = "hello";
        let n: typeof s;
    - ReturnType<T>
      - type Predicate = (x: unknown) => boolean;
        type K = ReturnType<Predicate>;
      - function f() {
          return { x: 10, y: 3 };
        }
        type P = ReturnType<typeof f>;
    - 下标（Index）
      - type Person = { age: number; name: string; alive: boolean };
        type Age = Person["age"];
        type I1 = Person["age" | "name"];
        type I2 = Person[keyof Person];
    - Map类型
      - type OnlyBoolsAndHorses = {
           [key: string]: boolean;
        };
      - type OptionsFlags<Type> = {
           [Property in keyof Type]: boolean;
        };
  - 常用工具方法
    - Awaited<Promise<string>>
    - ReturnType<Type>
    - Partial<Type>
    - Required<Type>
    - Record<KeyType, ValueType>
    - Pick<Type, Keys> -> Pick<Todo, "title" | "completed">
    - Omit<Type, Keys> -> Omit<Todo, "description">
*/
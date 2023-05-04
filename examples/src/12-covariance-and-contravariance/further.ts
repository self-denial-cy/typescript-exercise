/**
 * 联合类型和兄弟类型下的比较
 * 在类型层级中还有隐式的父子类型关系【联合类型】以及兄弟类型【同一基类的两个派生类】
 * 对于隐式的父子类型仍然沿用显示的父子类型协变与逆变判断
 * 但对于兄弟类型，比如 Dog 和 Cat，需要注意它们根本就不满足逆变与协变的发生条件【父子关系】，因此 Cat => void ≤ Dog => void【或者反过来】无论在严格检查或默认情况下均不成立
 */

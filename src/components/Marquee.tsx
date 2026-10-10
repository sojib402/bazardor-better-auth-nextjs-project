"use cache"
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
interface HeadlineType {
    id: number,
    nameBn: string,
    categoryIcon: string,
    today: number,
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    }

}
const Marquee = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data: HeadlineType[] = await res.json()
    console.log(data, 'for marquee')
    return (
        <div className="bg-gray-200 py-2 mt-5">
            <MarqueeText direction="right" duration={10}>
                <div>
                    {
                        data.map(m => <span key={m.id} className="mx-10">
                            <span>{m.categoryIcon}</span>
                            <span className="mx-2">{m.nameBn}</span>
                            <span>{m.today.toLocaleString('bn-BD')}</span>
                            <span className="mx-3">'টাকা/কেজি'</span>
                            <span>
                                {
                                    m.change.dir === "down" ? (
                                        <span className="text-red-600">
                                            <span>▼</span>{m.change.pct}%
                                        </span>
                                    ) : m.change.dir === "up" ? (
                                        <span className="text-green-600">
                                            <span>▲</span>{m.change.pct}%
                                        </span>
                                    ) : (
                                        <span>-{m.change.pct}%</span>
                                    )
                                }
                            </span>
                        </span>)
                    }
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquee;
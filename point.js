class Point {

    constructor(X, Y, Z, color) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;

        this.R = color[0];
        this.G = color[1];
        this.B = color[2];

        this.points = [createVector(X, Y, Z)];
        this.midpoint = createVector(0, 0, 0);
        this.max_points = 500;
        
        for (let i=0; i < this.max_points; i++) {
            this.calculate();
        }
    } 
    
    getMidpoint() {
        return this.midpoint;
    }
    
    calculate() {
        let DX = sigma * (this.Y - this.X);
        let DY = this.X * (rho - this.Z) - this.Y;
        let DZ = this.X * this.Y - beta * this.Z;

        this.X += DX * DT;
        this.Y += DY * DT;
        this.Z += DZ * DT;

        let vector = createVector(
            this.X,
            this.Y,
            this.Z
        );
        
        let divided_vector = vector.copy();
        divided_vector.div(this.max_points);
        this.midpoint.add(divided_vector);

        this.points.push(vector);

        if (this.points.length > this.max_points) {
            divided_vector = this.points[0].copy();
            divided_vector.div(this.max_points);
            this.midpoint.sub(divided_vector);
            this.points.shift();
        }
    }

    show() {
        noFill();

        beginShape();
        for (let point of this.points) {
            stroke(
                this.R, 
                this.G,
                this.B,
                10);

            vertex(
                point.x,
                point.y,
                point.z,
            );
        }
        endShape();
    }
}
